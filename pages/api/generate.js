import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, prompt } = req.body;

  if (!image ||!prompt) {
    return res.status(400).json({ error: 'Image and prompt are required' });
  }

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: image,
          prompt: prompt,
          refine: "expert_ensemble_refiner",
          scheduler: "K_EULER",
          num_inference_steps: 25,
          guidance_scale: 7.5,
          strength: 0.6, // Qué tanto cambia la imagen. 0.1 = poco, 1 = mucho
          negative_prompt: "blurry, bad quality, distorted"
        }
      }
    );

    return res.status(200).json({ output: output[0] });
  } catch (error) {
    console.error('Replicate error:', error);
    return res.status(500).json({ error: 'Error al generar imagen', details: error.message });
  }
}
