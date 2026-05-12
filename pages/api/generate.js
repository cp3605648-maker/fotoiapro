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
      return res.status(400).json({ error: 'Escribe qué quieres que haga la IA' });
    }

    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      {
        input: {
          input_image: image,
          prompt: `professional portrait, ${prompt}, 8k, ultra realistic, sharp focus, studio quality`,
          negative_prompt: "blurry, low quality, cartoon, anime, painting, distorted face, bad anatomy, nsfw, nude, ugly, deformed",
          num_outputs: 1,
          style_strength: 20,
          num_steps: 20,
          guidance_scale: 5,
          style_name: "Photographic (Default)"
        }
      }
    );

    if (!output || !output[0]) {
      throw new Error('La IA no pudo procesar esta foto. Usa una selfie clara, de frente y con buena luz.');
    }

    res.status(200).json({ image: output[0] });
  } catch (error) {
    console.error('Error Replicate:', error);
    res.status(500).json({ 
      error: error.message.includes('NSFW') 
        ? 'La imagen fue rechazada por contenido. Usa una foto normal.' 
        : 'No se pudo procesar. Usa una selfie clara, de frente, sin objetos en la cara.'
    });
  }
}
