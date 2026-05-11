export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'Falta la imagen' });
    }

    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570e55",
      {
        input: {
          input_image: image,
          prompt: "a photo of a person img as an influencer in Tulum, beach, professional photo, 8k",
          negative_prompt: "ugly, deformed, noisy, blurry, distorted",
          num_outputs: 3,
          style_strength: 20,
          num_steps: 50,
          guidance_scale: 5,
          upscale: 2
        }
      }
    );

    res.status(200).json({ output });

  } catch (error) {
    console.error("ERROR REPLICATE:", error);
    res.status(500).json({ 
      error: 'Error generando fotos', 
      detalle: error.message 
    });
  }
}
}
