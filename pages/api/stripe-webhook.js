import Stripe from "stripe";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { sendPurchaseEmail } from "../../lib/sendPurchaseEmail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const sig = req.headers["stripe-signature"];
  const rawBody = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status !== "paid") {
        return res.status(200).json({ received: true });
      }

      const userId = session.metadata?.userId;
      const packageType = session.metadata?.packageType;
      const credits = Number(session.metadata?.credits || 0);

      if (!userId || !credits) {
        return res.status(200).json({ received: true });
      }

      const { data: existing } = await supabaseAdmin
        .from("purchases")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

      if (existing) {
        return res.status(200).json({ received: true, duplicate: true });
      }

      const { data: profile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("credits,email")
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
          credits_added: credits,
          credits,
          amount: session.amount_total,
          currency: session.currency,
          status: "completed",
        });

      if (purchaseError) throw purchaseError;

      await sendPurchaseEmail({
        email: session.customer_details?.email || profile?.email,
        credits,
        amount: session.amount_total,
        currency: session.currency,
      });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}
