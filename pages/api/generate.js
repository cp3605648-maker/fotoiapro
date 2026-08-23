import Replicate from "replicate";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { buildPrompt } from "../../lib/ai/router";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

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
        error: "Falta imagen.",
      });
    }

    // =========================================================
    // 1. VALIDAR PERFIL Y CRÉDITOS EN EL SERVIDOR
    // =========================================================

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
        error: "No tienes créditos disponibles. Compra un paquete para continuar.",
        creditsLeft: currentCredits,
      });
    }

    // =========================================================
    // 2. CONSTRUIR PROMPT COMERCIAL
    // =========================================================

    const {
      prompt: finalPrompt,
      negativePrompt,
    } = buildPrompt(
      userPrompt || "",
      Boolean(isPaid),
      imageMeta || null,
      preset || ""
    );

    let input = {
      prompt: finalPrompt,
      input_image: image,
      negative_prompt: negativePrompt,
    };

    // La imagen de referencia se utiliza únicamente
    // cuando el usuario proporciona una.
    if (referenceImage) {
      input.reference_image = referenceImage;
    }

    console.log("GENERATE_INPUT_KEYS:", Object.keys(input));
    console.log("COMMERCIAL_PRESET:", preset || "auto-detect");
    console.log("REFERENCE_USED:", !!referenceImage);
    console.log("USER_ID:", userId);
    console.log("CREDITS_BEFORE:", currentCredits);

    // =========================================================
    // 3. GENERAR IMAGEN
    // =========================================================

    const output = await replicate.run(
      "black-forest-labs/flux-kontext-pro",
      {
        input,
      }
    );

    const outputUrl = Array.isArray(output) ? output[0] : output;

    if (!outputUrl) {
      throw new Error("Replicate no devolvió una imagen válida.");
    }

    // =========================================================
    // 4. DESCONTAR EXACTAMENTE 1 CRÉDITO
    // =========================================================
    //
    // El UPDATE incluye el saldo anterior para evitar
    // sobrescribir cambios realizados simultáneamente.
    //

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
          "La imagen fue generada, pero no pudimos actualizar tus créditos. No vuelvas a generar hasta verificar tu saldo.",
      });
    }

    console.log("CREDITS_AFTER:", updatedProfile.credits);

    // =========================================================
    // 5. RESPUESTA
    // =========================================================

    return res.status(200).json({
      success: true,
      output: outputUrl,
      commercialPreset: preset || "ad",
      referenceUsed: !!referenceImage,
      creditsLeft: updatedProfile.credits,
    });
  } catch (error) {
    console.error("GENERATE_ERROR:", error);

    return res.status(500).json({
      error: "Error al generar.",
      details: error.message,
    });
  }
}
