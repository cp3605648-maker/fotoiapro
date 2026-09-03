import Replicate from "replicate";
import Stripe from "stripe";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function clean(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  let paymentClaimed = false;
  let paymentSessionId = "";
  let userId = "";

  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Método no permitido",
      });
    }

    const {
      userId: bodyUserId,
      paymentSessionId: bodyPaymentSessionId,
      businessName,
      businessType,
      style,
      colors,
      description,
    } = req.body || {};

    userId = clean(bodyUserId, 100);
    paymentSessionId = clean(bodyPaymentSessionId, 200);

    if (!userId) {
      return res.status(401).json({
        error: "Debes iniciar sesión.",
      });
    }

    if (!paymentSessionId) {
      return res.status(402).json({
        error: "Debes pagar el logotipo antes de generarlo.",
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

    /*
     * Verificar directamente con Stripe que el pago existe,
     * está pagado y pertenece a este usuario.
     */
    const session = await stripe.checkout.sessions.retrieve(paymentSessionId);

    if (session.payment_status !== "paid") {
      return res.status(402).json({
        error: "El pago del logotipo todavía no está confirmado.",
      });
    }

    if (session.metadata?.userId !== userId) {
      return res.status(403).json({
        error: "Este pago no pertenece al usuario.",
      });
    }

    if (
      session.metadata?.productType !== "logo" ||
      session.metadata?.packageType !== "logo_launch_mxn"
    ) {
      return res.status(403).json({
        error: "Este pago no corresponde a un logotipo.",
      });
    }

    /*
     * El pago debe existir también en purchases.
     * Cambiamos completed -> processing para evitar usar
     * la misma compra varias veces simultáneamente.
     */
    const { data: claimedPurchase, error: claimError } = await supabaseAdmin
      .from("purchases")
      .update({
        status: "processing",
      })
      .eq("stripe_session_id", paymentSessionId)
      .eq("user_id", userId)
      .eq("status", "completed")
      .select("id")
      .maybeSingle();

    if (claimError) {
      throw claimError;
    }

    if (!claimedPurchase) {
      return res.status(409).json({
        error:
          "Este pago ya fue utilizado o todavía no ha sido confirmado.",
      });
    }

    paymentClaimed = true;

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

    console.log("GENERATE_PAID_LOGO:", {
      userId,
      businessName: cleanName,
      businessType: cleanType,
      paymentSessionId,
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
      throw new Error(
        "Replicate no devolvió una URL válida para el logotipo."
      );
    }

    /*
     * Marcar la compra como utilizada.
     */
    const { error: usedError } = await supabaseAdmin
      .from("purchases")
      .update({
        status: "used",
      })
      .eq("stripe_session_id", paymentSessionId)
      .eq("user_id", userId);

    if (usedError) {
      console.error("LOGO_PURCHASE_USED_ERROR:", usedError);
    }

    paymentClaimed = false;

    return res.status(200).json({
      success: true,
      output: outputUrl,
    });
  } catch (error) {
    console.error("GENERATE_LOGO_ERROR:", error);

    /*
     * Si Replicate falla después de reservar el pago,
     * permitimos que el cliente vuelva a intentar.
     */
    if (paymentClaimed && paymentSessionId && userId) {
      try {
        await supabaseAdmin
          .from("purchases")
          .update({
            status: "completed",
          })
          .eq("stripe_session_id", paymentSessionId)
          .eq("user_id", userId)
          .eq("status", "processing");
      } catch (restoreError) {
        console.error(
          "LOGO_PAYMENT_RESTORE_ERROR:",
          restoreError
        );
      }
    }

    return res.status(500).json({
      error: "Error al generar el logotipo.",
      details: error.message,
    });
  }
}
