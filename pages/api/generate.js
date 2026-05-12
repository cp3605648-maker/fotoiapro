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
    // MODELO NUEVO: Flux.1 Kontext - reemplazo de instruct-pix2pix
    const output = await replicate.run(
      "black-forest-labs/flux-kontext-pro",
      {
        input: {
          prompt: `Change the background to: ${prompt}. Keep the person identical, same face, same clothes, same pose. Photorealistic, high detail.`,
          input_image: image,
          output_format: "jpg",
          guidance_scale: isPaid? 3.5 : 2.5,
          num_inference_steps: isPaid? 30 : 20
        }
      }
    );

    return res.status(200).json({
      output: output,
      isDemo:!isPaid
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Error al generar',
      details: error.message
    });
  }
}
