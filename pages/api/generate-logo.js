import Replicate from "replicate";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function clean(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Método no permitido",
      });
    }

    const {
      userId,
      businessName,
      businessType,
      style,
      colors,
      description,
    } = req.body || {};

    if (!userId) {
      return res.status(401).json({
        error: "Debes iniciar sesión.",
      });
    }

    const cleanName = clean(businessName, 80);
    const cleanType = clean(businessType, 80);
    const cleanStyle = clean(style, 80);
    const cleanColors = clean(colors, 120);
    const cleanDescription = clean(description, 500);

    if (!cleanName) {
      return res.status(400).json({
        error: "Falta el nombre del negocio.",
      });
    }

    // Consultar créditos actuales.
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id,credits")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({
        error: "No se encontró el perfil del usuario.",
      });
    }

    const currentCredits = Number(profile.credits || 0);

    if (currentCredits <= 0) {
      return res.status(402).json({
        error: "No tienes créditos disponibles para crear un logotipo.",
      });
    }

    const prompt = `
Create a professional commercial logo for a real business.

BUSINESS NAME:
"${cleanName}"

BUSINESS TYPE:
${cleanType || "Business"}

DESIRED STYLE:
${cleanStyle || "Modern"}

COLORS:
${cleanColors || "Choose a professional color palette appropriate for the business"}

USER DESCRIPTION:
${cleanDescription || "Create a memorable, clean and professional brand identity."}

LOGO REQUIREMENTS:
- Create a professional brand identity suitable for a real business.
- The business name must be clearly readable.
- Use clean, intentional typography.
- Create a distinctive and memorable symbol or icon when appropriate.
- Keep the design simple enough to work on flyers, menus, social media, packaging and signage.
- Strong visual hierarchy.
- Balanced spacing.
- Professional commercial graphic design.
- Flat or clean vector-inspired appearance.
- Avoid photorealistic scenes.
- Avoid mockups.
- Avoid business cards.
- Avoid storefronts.
- Avoid walls, signs, posters or physical objects displaying the logo.
- Show the logo as the primary design.
- Use the requested colors.
- Do not add slogans unless explicitly requested.
- No extra words.
- No watermark.
- Square 1:1 composition.
`;

    console.log("GENERATE_LOGO:", {
      userId,
      businessName: cleanName,
      businessType: cleanType,
      style: cleanStyle,
    });

    const output = await replicate.run(
      "ideogram-ai/ideogram-v4-balanced",
      {
        input: {
          prompt,
          aspect_ratio: "1:1",
        },
      }
    );

    const rawOutput = Array.isArray(output) ? output[0] : output;

    let outputUrl = "";

    if (typeof rawOutput === "string") {
      outputUrl = rawOutput;
    } else if (rawOutput && typeof rawOutput.url === "function") {
      outputUrl = rawOutput.url();
    } else if (rawOutput?.url) {
      outputUrl = String(rawOutput.url);
    } else {
      outputUrl = String(rawOutput || "");
    }

    if (!outputUrl || outputUrl === "[object Object]") {
      throw new Error("Replicate no devolvió una URL válida para el logotipo.");
    }

    // Descontar exactamente 1 crédito después de generar correctamente.
    // Se comprueba nuevamente el saldo para evitar descontar un saldo negativo.
    const newCredits = currentCredits - 1;

    const { data: updatedProfile, error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        credits: newCredits,
      })
      .eq("id", userId)
      .eq("credits", currentCredits)
      .select("credits")
      .single();

    if (updateError || !updatedProfile) {
      console.error("LOGO_CREDIT_UPDATE_ERROR:", updateError);

      return res.status(409).json({
        error: "El logotipo fue generado, pero no pudimos actualizar tus créditos. Intenta nuevamente.",
      });
    }

    return res.status(200).json({
      success: true,
      output: outputUrl,
      creditsLeft: updatedProfile.credits,
    });
  } catch (error) {
    console.error("GENERATE_LOGO_ERROR:", error);

    return res.status(500).json({
      error: "Error al generar el logotipo.",
      details: error.message,
    });
  }
}
