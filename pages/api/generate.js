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
      "timbrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
      {
        input: {
          image: image,
          prompt: prompt,
          num_inference_steps: 20,
          image_guidance_scale: 1.5,
          guidance_scale: 7.5
        }
      }
    );

    return res.status(200).json({ output: output[0] });
  } catch (error) {
    console.error('Replicate error:', error);
    return res.status(500).json({ 
      error: 'Error al generar imagen', 
      details: error.message 
    });
  }
}
