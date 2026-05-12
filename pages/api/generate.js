import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, prompt } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Falta la imagen' });
    }

    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      {
        input: {
          input_image: image,
          prompt: prompt || "professional headshot photo, business suit, clean background, studio lighting, 8k, ultra realistic, linkedin profile picture",
          negative_prompt: "blurry, low quality, cartoon, anime, painting, distorted face, bad anatomy, extra fingers",
          num_outputs: 1,
          style_strength: 20,
          num_steps: 20,
          guidance_scale: 5,
        }
      }
    );

    if (!output ||!output[0]) {
      throw new Error('Replicate no regresó imagen');
    }

    res.status(200).json({ image: output[0] });
  } catch (error) {
    console.error('Error Replicate:', error);
    res.status(500).json({ error: 'Error generando la foto con IA' });
  }
}
