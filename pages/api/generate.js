import Replicate from "replicate";
import sharp from "sharp";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { buildPrompt } from "../../lib/ai/router";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function getOutputAspectRatio(
  preset,
  socialFormat,
  marketplacePlatform,
  marketplaceImageType
) {
  if (
    preset === "marketplace" &&
    marketplacePlatform === "amazon" &&
    marketplaceImageType === "main"
  ) {
    return "1:1";
  }

  if (preset !== "social") {
    return "match_input_image";
  }

  const ratios = {
    instagram_post: "1:1",
    instagram_story: "9:16",
    instagram_reel: "9:16",
    facebook_post: "1:1",
    facebook_story: "9:16",
    tiktok: "9:16",
    whatsapp_status: "9:16",
    linkedin_post: "16:9",
    x_post: "16:9",
    pinterest_pin: "2:3",
  };

  return ratios[socialFormat] || "1:1";
}

function getOutputUrl(output) {
  const raw = Array.isArray(output) ? output[0] : output;

  if (!raw) {
    throw new Error("Replicate no devolvió una imagen válida.");
  }

  if (typeof raw === "string") {
    return raw;
  }

  if (typeof raw.url === "function") {
    return raw.url();
  }

  if (raw.url) {
    return String(raw.url);
  }

  return String(raw);
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Método no permitido",
      });
    }

    const {
      image,
      referenceImage,
      prompt: userPrompt,
      preset,
      socialFormat,
      marketplacePlatform,
      marketplaceImageType,
      menuType,
      adType,
      flyerType,
      promotionType,
      isPaid,
      imageMeta,
      userId,
    } = req.body || {};

    if (!userId) {
      return res.status(401).json({
        error: "Debes iniciar sesión.",
      });
    }

    if (!image) {
      return res.status(400).json({
        error: "Falta la imagen del producto.",
      });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id,credits")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      console.error("GENERATE_PROFILE_ERROR:", profileError);

      return res.status(404).json({
        error: "No se encontró el perfil del usuario.",
      });
    }

    const currentCredits = Number(profile.credits || 0);

    if (currentCredits <= 0) {
      return res.status(402).json({
        error: "No tienes créditos disponibles.",
        creditsLeft: currentCredits,
      });
    }

    const hasReferenceImage =
      typeof referenceImage === "string" &&
      referenceImage.trim().length > 0;

    const {
      prompt: finalPrompt,
      negativePrompt,
    } = buildPrompt(
      userPrompt || "",
      Boolean(isPaid),
      imageMeta || null,
      preset || "ad",
      hasReferenceImage,
      socialFormat || "",
      menuType || "",
      adType || "",
      flyerType || "",
      promotionType || "",
      marketplacePlatform || "",
      marketplaceImageType || ""
    );

    const aspectRatio = getOutputAspectRatio(
      preset || "ad",
      socialFormat || "",
      marketplacePlatform || "",
      marketplaceImageType || ""
    );

    let output;

    const isAmazonMain =
      preset === "marketplace" &&
      marketplacePlatform === "amazon" &&
      marketplaceImageType === "main";

    /*
     * AMAZON - IMAGEN PRINCIPAL
     *
     * Flujo especial automático:
     * - elimina el fondo original
     * - conserva el producto real
     * - coloca fondo blanco
     *
     * Este tratamiento tiene prioridad sobre la descripción
     * del usuario cuando se selecciona Amazon + Imagen principal.
     */
    if (isAmazonMain) {
      console.log(
        "MODEL:",
        "851-labs/background-remover"
      );
      console.log("AMAZON_MAIN_BACKGROUND_REMOVAL:", true);
      console.log("PRESET:", "marketplace");

      output = await replicate.run(
        "851-labs/background-remover:a029dff38972b5fda4ec5d75d7d1cd25aeff621d2cf4946a41055d7db66b80bc",
        {
          input: {
            image,
            format: "png",
            reverse: false,
            threshold: 0,
            background_type: "rgba",
          },
        }
      );
    }

    /*
     * SIN LOGO:
     * Usamos FLUX Kontext Pro normal.
     */
    else if (!hasReferenceImage) {
      const input = {
        prompt: finalPrompt,
        input_image: image,
        aspect_ratio: aspectRatio,
        output_format: "png",
        safety_tolerance: 2,
        prompt_upsampling: true,
      };

      console.log("MODEL:", "black-forest-labs/flux-kontext-pro");
      console.log("REFERENCE_IMAGE:", false);
      console.log("PRESET:", preset || "ad");

      output = await replicate.run(
        "black-forest-labs/flux-kontext-pro",
        {
          input,
        }
      );
    } else {
      /*
       * CON LOGO:
       * Usamos Multi-image Kontext Pro.
       *
       * input_image_1 = producto
       * input_image_2 = logo/referencia
       */
      const multiImagePrompt = `
${finalPrompt}

SECOND IMAGE ROLE:
The second input image is the CLIENT'S BUSINESS LOGO / BRAND REFERENCE.

COMBINATION INSTRUCTION:
- Use image 1 as the exact product.
- Use image 2 as the exact business logo reference.
- Integrate the logo naturally into the commercial design.
- The logo must remain recognizable.
- Do not redesign it.
- Do not replace it.
- Do not invent another logo.
- Do not confuse the logo with the product.
- Keep the product as the main visual subject.
`;

      const input = {
        prompt: multiImagePrompt,
        input_image_1: image,
        input_image_2: referenceImage,
        aspect_ratio: aspectRatio,
        output_format: "png",
        safety_tolerance: 2,
      };

      console.log(
        "MODEL:",
        "flux-kontext-apps/multi-image-kontext-pro"
      );
      console.log("REFERENCE_IMAGE:", true);
      console.log("PRESET:", preset || "ad");

      output = await replicate.run(
        "flux-kontext-apps/multi-image-kontext-pro",
        {
          input,
        }
      );
    }

    let outputUrl = getOutputUrl(output);

    if (
      !outputUrl ||
      outputUrl === "[object Object]" ||
      !String(outputUrl).startsWith("http")
    ) {
      throw new Error(
        "Replicate no devolvió una URL válida para la imagen."
      );
    }

    /*
     * AMAZON MAIN - COMPOSICIÓN FINAL 1:1
     *
     * El removedor devuelve el producto con transparencia.
     * Aquí:
     * 1. descargamos la imagen,
     * 2. recortamos transparencia sobrante,
     * 3. ajustamos el producto,
     * 4. lo centramos sobre fondo blanco 1600x1600,
     * 5. guardamos el PNG final en Supabase Storage.
     */
    if (isAmazonMain) {
      const removedResponse = await fetch(outputUrl);

      if (!removedResponse.ok) {
        throw new Error(
          "No pudimos descargar la imagen sin fondo."
        );
      }

      const removedBuffer = Buffer.from(
        await removedResponse.arrayBuffer()
      );

      const trimmedBuffer = await sharp(removedBuffer)
        .trim({
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0,
          },
        })
        .png()
        .toBuffer();

      const productBuffer = await sharp(trimmedBuffer)
        .resize({
          width: 1360,
          height: 1360,
          fit: "inside",
          withoutEnlargement: true,
        })
        .png()
        .toBuffer();

      const productMeta = await sharp(productBuffer).metadata();

      const canvasSize = 1600;
      const productWidth = productMeta.width || 1;
      const productHeight = productMeta.height || 1;

      const left = Math.max(
        0,
        Math.round((canvasSize - productWidth) / 2)
      );

      const top = Math.max(
        0,
        Math.round((canvasSize - productHeight) / 2)
      );

      const finalAmazonBuffer = await sharp({
        create: {
          width: canvasSize,
          height: canvasSize,
          channels: 4,
          background: {
            r: 255,
            g: 255,
            b: 255,
            alpha: 1,
          },
        },
      })
        .composite([
          {
            input: productBuffer,
            left,
            top,
          },
        ])
        .png()
        .toBuffer();

      const storagePath =
        `${userId}/amazon-main-${Date.now()}.png`;

      const {
        error: amazonUploadError,
      } = await supabaseAdmin.storage
        .from("uploads")
        .upload(storagePath, finalAmazonBuffer, {
          contentType: "image/png",
          upsert: false,
        });

      if (amazonUploadError) {
        console.error(
          "AMAZON_MAIN_UPLOAD_ERROR:",
          amazonUploadError
        );

        throw new Error(
          "No pudimos guardar la imagen final de Amazon."
        );
      }

      const {
        data: amazonPublicData,
      } = supabaseAdmin.storage
        .from("uploads")
        .getPublicUrl(storagePath);

      if (!amazonPublicData?.publicUrl) {
        throw new Error(
          "No pudimos obtener la URL final de Amazon."
        );
      }

      outputUrl = amazonPublicData.publicUrl;

      console.log("AMAZON_MAIN_SQUARE:", true);
      console.log("AMAZON_MAIN_STORAGE_PATH:", storagePath);
    }

    let balanceToCharge = currentCredits;
    let updatedProfile = null;
    let creditUpdateError = null;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (balanceToCharge <= 0) {
        break;
      }

      const newCredits = balanceToCharge - 1;

      const {
        data,
        error,
      } = await supabaseAdmin
        .from("profiles")
        .update({
          credits: newCredits,
        })
        .eq("id", userId)
        .eq("credits", balanceToCharge)
        .select("credits")
        .maybeSingle();

      creditUpdateError = error;

      if (error) {
        break;
      }

      if (data) {
        updatedProfile = data;
        break;
      }

      /*
       * El saldo cambió mientras Replicate generaba la imagen.
       * Volvemos a leerlo y reintentamos el descuento sin
       * sobrescribir un saldo más reciente.
       */
      const {
        data: latestProfile,
        error: latestProfileError,
      } = await supabaseAdmin
        .from("profiles")
        .select("credits")
        .eq("id", userId)
        .single();

      if (latestProfileError || !latestProfile) {
        creditUpdateError = latestProfileError;
        break;
      }

      balanceToCharge = Number(latestProfile.credits || 0);
    }

    if (creditUpdateError || !updatedProfile) {
      console.error(
        "GENERATE_CREDIT_UPDATE_ERROR:",
        creditUpdateError
      );

      return res.status(409).json({
        error:
          "La imagen fue generada, pero no pudimos actualizar tus créditos. Verifica tu saldo antes de volver a generar.",
      });
    }

    console.log("GENERATE_SUCCESS");
    console.log("CATEGORY:", preset || "ad");
    console.log("REFERENCE_USED:", hasReferenceImage);
    console.log("CREDITS_BEFORE:", currentCredits);
    console.log("CREDITS_AFTER:", updatedProfile.credits);

    return res.status(200).json({
      success: true,
      output: outputUrl,
      commercialPreset: preset || "ad",
      referenceUsed: hasReferenceImage,
      creditsLeft: updatedProfile.credits,
    });
  } catch (error) {
    console.error("GENERATE_ERROR:", error);

    return res.status(500).json({
      error: "Error al generar la imagen.",
      details: error?.message || "Error desconocido.",
    });
  }
}
