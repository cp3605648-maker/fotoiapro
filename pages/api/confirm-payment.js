import Stripe from "stripe";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  const { sessionId, userId } = req.body || {};

  if (!sessionId || !userId) {
    return res.status(400).json({
      error: "Falta sessionId o userId",
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        error: "Pago no confirmado",
      });
    }

    const stripeUserId = session.metadata?.userId;
    const packageType = session.metadata?.packageType;
    const productType = session.metadata?.productType || "credits";
    const credits = Number(session.metadata?.credits || 0);

    if (stripeUserId !== userId) {
      return res.status(403).json({
        error: "Pago no pertenece al usuario",
      });
    }

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("purchases")
      .select("id,status")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    /*
     * COMPRA DE LOGOTIPO
     * No agrega créditos.
     */
    if (productType === "logo") {
      if (!existing) {
        const { error: purchaseError } = await supabaseAdmin
          .from("purchases")
          .insert({
            user_id: userId,
            stripe_session_id: session.id,
            package_type: packageType,
            credits_added: 0,
            credits: 0,
            amount: session.amount_total,
            currency: session.currency,
            status: "completed",
          });

        if (purchaseError) {
          throw purchaseError;
        }
      }

      return res.status(200).json({
        success: true,
        productType: "logo",
        packageType,
        sessionId: session.id,
        amount: session.amount_total,
        currency: session.currency,
        alreadyConfirmed: Boolean(existing),
      });
    }

    /*
     * COMPRA DE CRÉDITOS
     */
    if (existing) {
      const { data: profile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("credits")
        .eq("id", userId)
        .single();

      if (profileError) {
        throw profileError;
      }

      return res.status(200).json({
        success: true,
        productType: "credits",
        alreadyConfirmed: true,
        credits: profile?.credits || 0,
        amount: session.amount_total,
        currency: session.currency,
      });
    }

    if (credits <= 0) {
      return res.status(400).json({
        error: "La compra no contiene créditos válidos.",
      });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      throw profileError || new Error("Perfil no encontrado");
    }

    const newCredits = Number(profile.credits || 0) + credits;

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        credits: newCredits,
      })
      .eq("id", userId);

    if (updateError) {
      throw updateError;
    }

    const { error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .insert({
        user_id: userId,
        stripe_session_id: session.id,
        package_type: packageType,
        credits_added: credits,
        credits,
        amount: session.amount_total,
        currency: session.currency,
        status: "completed",
      });

    if (purchaseError) {
      throw purchaseError;
    }

    return res.status(200).json({
      success: true,
      productType: "credits",
      addedCredits: credits,
      credits: newCredits,
      amount: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    console.error("CONFIRM PAYMENT ERROR:", err);

    return res.status(500).json({
      error: "No se pudo confirmar el pago",
      details: err.message,
    });
  }
}
