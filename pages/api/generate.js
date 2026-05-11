import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570e55",
      {
        input: {
          input_image: image,
          prompt: "a photo of a person img as an influencer in Tulum, beach, professional photo, 8k",
          negative_prompt: "blurry, ugly, deformed, noisy, lowres, text, watermark",
          num_steps: 50,
          style_strength_ratio: 20,
          num_outputs: 1,
          guidance_scale: 5,
          style_name: "Photographic"
        }
      }
    );

    return res.status(200).json({ output });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate image' });
  }
}
}
