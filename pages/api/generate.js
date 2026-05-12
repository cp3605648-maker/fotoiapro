import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function enhancePrompt(userInput) {
  const base = userInput.toLowerCase();
  
  if (base.includes('logo')) {
    return `professional logo design, ${userInput}, vector style, clean background, high quality, 8k`;
  }
  if (base.includes('fondo') || base.includes('background') || base.includes('playa') || base.includes('atardecer')) {
    return `change background to ${userInput}, keep the main subject unchanged, realistic lighting, high detail, photorealistic, 8k`;
  }
  if (base.includes('ropa') || base.includes('camisa') || base.includes('vestido')) {
    return `change clothes to ${userInput}, keep face and pose same, realistic fabric texture, high quality`;
  }
  if (base.includes('marca') || base.includes('branding')) {
    return `professional branding shot, ${userInput}, studio lighting, commercial photography, 8k`;
  }
  
  return `${userInput}, high quality, photorealistic, 8k, detailed, professional photography`;
}

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, prompt } = req.body;

  if (!image ||!prompt) {
    return res.status(400).json({ error: 'Image and prompt are required' });
  }

  try {
    const enhancedPrompt = enhancePrompt(prompt);

    const output = await replicate.run(
      "philz1337x/clarity-upscaler:dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e",
      {
        input: {
          image: image,
          prompt: enhancedPrompt,
          negative_prompt: "blurry, low quality, text, watermark, distorted, deformed",
          scale_factor: 1,
          scheduler: "DPM++ 2M Karras", // ← ESTE ERA EL ERROR, ya arreglado
          creativity: 0.35,
          resemblance: 0.7,
          guidance_scale: 7,
          num_inference_steps: 20
        }
      }
    );

    return res.status(200).json({ 
      output: output,
      usedPrompt: enhancedPrompt
    });
  } catch (error) {
    console.error('Replicate error:', error);
    return res.status(500).json({ 
      error: 'Error al generar imagen', 
      details: error.message 
    });
  }
}
