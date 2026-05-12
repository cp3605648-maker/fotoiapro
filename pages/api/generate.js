import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, prompt } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Falta la imagen' });
    }

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: 'Describe qué quieres cambiar en la imagen' });
    }

    // SDXL + ControlNet: Acepta CUALQUIER imagen y la edita con texto
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: image, // Acepta cualquier imagen
          prompt: `${prompt}, high quality, detailed, 8k`,
          negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy",
          strength: 0.6, // Qué tanto cambiar la imagen original. 0.1 = cambios sutiles, 0.9 = cambio total
          num_inference_steps: 25,
          guidance_scale: 7.5
        }
      }
    );

    if (!output || !output[0]) {
      throw new Error('La IA no pudo procesar esta imagen');
    }

    res.status(200).json({ image: output[0] });
  } catch (error) {
    console.error('Error Replicate:', error);
    res.status(500).json({ 
      error: 'No se pudo editar la imagen. Intenta con otra descripción o imagen.'
    });
  }
}
