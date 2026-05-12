import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const packages = {
  basic: {
    credits: 10,
    price: 900, // $9
    name: 'Pack 10 Fotos IA Pro'
  },
  pro: {
    credits: 30,
    price: 1900, // $19
    name: 'Pack 30 Fotos IA Pro'
  }
};

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { packageType } = req.body; // 'basic' o 'pro'
  const selectedPackage = packages[packageType] || packages.basic;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: selectedPackage.name,
            description: `Créditos para editar imágenes con IA`
          },
          unit_amount: selectedPackage.price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/?paid=true&credits=${selectedPackage.credits}`,
      cancel_url: `${req.headers.origin}/?cancelled=true`,
    });

    res.status(200).json({
      id: session.id,
      url: session.url
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
