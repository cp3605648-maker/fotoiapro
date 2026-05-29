import Stripe from "stripe";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
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
        error: "El pago no está confirmado",
      });
    }

    const stripeUserId = session.metadata?.userId;
    const packageType = session.metadata?.packageType;
    const credits = Number(session.metadata?.credits || 0);

    if (stripeUserId !== userId) {
      return res.status(403).json({
        error: "El pago no pertenece a este usuario",
      });
    }

    if (!credits || credits <= 0) {
      return res.status(400).json({
        error: "Créditos inválidos",
      });
    }

    const { data: existingPurchase } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (existingPurchase) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("credits")
        .eq("id", userId)
        .single();

      return res.status(200).json({
        alreadyConfirmed: true,
        credits: profile?.credits || 0,
      });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    const newCredits = (profile?.credits || 0) + credits;

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ credits: newCredits })
      .eq("id", userId);

    if (updateError) throw updateError;

    const { error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .insert({
        user_id: userId,
        stripe_session_id: session.id,
        package_type: packageType,
        credits,
        currency: session.currency,
        amount: session.amount_total,
        status: "completed",
      });

    if (purchaseError) throw purchaseError;

    return res.status(200).json({
      success: true,
      addedCredits: credits,
      credits: newCredits,
    });
  } catch (err) {
    console.error("Confirm payment error:", err);

    return res.status(500).json({
      error: "No se pudo confirmar el pago",
      details: err.message,
    });
  }
}
