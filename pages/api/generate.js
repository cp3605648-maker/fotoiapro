import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  const { image, prompt, isPaid } = req.body;

  if (!image ||!prompt) {
    return res.status(400).json({ error: 'Falta imagen o descripción' });
  }

  try {
    const output = await replicate.run(
      "timbrooks/instruct-pix2pix", // ← Sin hash = usa última versión
      {
        input: {
          image: image,
          prompt: `change the background to ${prompt}, keep the person exactly the same, photorealistic`,
          num_inference_steps: isPaid? 50 : 20,
          image_guidance_scale: isPaid? 2.5 : 1.5,
          guidance_scale: 7.5
        }
      }
    );

    return res.status(200).json({
      output: output[0],
      isDemo:!isPaid
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Error al generar',
      details: error.message
    });
  }
}
