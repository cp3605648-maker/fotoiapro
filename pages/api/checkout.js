import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const packages = {
  basic_mxn: {
    credits: 10,
    price: 9900,
    currency: "mxn",
    name: "Pack 10 Créditos FotoIA Pro",
  },

  pro_mxn: {
    credits: 30,
    price: 19900,
    currency: "mxn",
    name: "Pack 30 Créditos FotoIA Pro",
  },

  premium_mxn: {
    credits: 100,
    price: 49900,
    currency: "mxn",
    name: "Pack 100 Créditos FotoIA Pro",
  },

  basic_usd: {
    credits: 10,
    price: 900,
    currency: "usd",
    name: "Pack 10 Credits FotoIA Pro",
  },

  pro_usd: {
    credits: 30,
    price: 1900,
    currency: "usd",
    name: "Pack 30 Credits FotoIA Pro",
  },

  logo_launch_mxn: {
    credits: 0,
    price: 6900,
    regularPrice: 14900,
    currency: "mxn",
    name: "Logotipo profesional con IA",
    description: "Precio especial de lanzamiento",
    productType: "logo",
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { packageType = "basic_mxn", userId } = req.body || {};

  if (!userId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const selectedPackage = packages[packageType];

  if (!selectedPackage) {
    return res.status(400).json({ error: "Paquete inválido" });
  }

  try {
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.origin ||
      "https://www.fotoia.pro";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: selectedPackage.currency,
            product_data: {
              name: selectedPackage.name,
              description:
              selectedPackage.productType === "logo"
                ? selectedPackage.description
                : `${selectedPackage.credits} créditos para FotoIA Pro`,
            },
            unit_amount: selectedPackage.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        packageType,
        credits: String(selectedPackage.credits || 0),
        currency: selectedPackage.currency,
        productType: selectedPackage.productType || "credits",
      },
      success_url:
        selectedPackage.productType === "logo"
          ? `${origin}/?success=true&purchase=logo&session_id={CHECKOUT_SESSION_ID}`
          : `${origin}/?success=true&purchase=credits&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        selectedPackage.productType === "logo"
          ? `${origin}/?cancelled=true&purchase=logo`
          : `${origin}/?cancelled=true&purchase=credits`,
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (err) {
    console.error("Stripe checkout error:", err);

    return res.status(500).json({
      error: "Error al iniciar pago",
      details: err.message,
    });
  }
}