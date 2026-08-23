import Replicate from "replicate";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { buildPrompt } from "../../lib/ai/router";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

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
      hasReferenceImage
    );

    let output;

    /*
     * SIN LOGO:
     * Usamos FLUX Kontext Pro normal.
     *
     * input_image es el campo oficial del modelo.
     */
    if (!hasReferenceImage) {
      const input = {
        prompt: finalPrompt,
        input_image: image,
        aspect_ratio: "match_input_image",
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
        aspect_ratio: "match_input_image",
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

    const outputUrl = getOutputUrl(output);

    if (
      !outputUrl ||
      outputUrl === "[object Object]" ||
      !String(outputUrl).startsWith("http")
    ) {
      throw new Error(
        "Replicate no devolvió una URL válida para la imagen."
      );
    }

    const newCredits = currentCredits - 1;

    const {
      data: updatedProfile,
      error: creditUpdateError,
    } = await supabaseAdmin
      .from("profiles")
      .update({
        credits: newCredits,
      })
      .eq("id", userId)
      .eq("credits", currentCredits)
      .select("credits")
      .single();

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
