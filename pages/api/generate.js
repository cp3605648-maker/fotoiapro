import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Función para mejorar el prompt del cliente automáticamente
function enhancePrompt(userInput) {
  const base = userInput.toLowerCase();
  
  // Plantillas para mejorar prompts en inglés que Replicate entiende mejor
  const templates = {
    logo: `professional logo design, ${userInput}, vector style, clean background, high quality, 8k`,
    fondo: `change background to ${userInput}, keep the main subject unchanged, realistic lighting, high detail, photorealistic`,
    ropa: `change clothes to ${userInput}, keep face and pose same, realistic fabric texture, high quality`,
    branding: `professional branding shot, ${userInput}, studio lighting, commercial photography, 8k`,
    producto: `professional product photography of ${userInput}, white background, studio lighting, commercial, 8k`,
    default: `${userInput}, high quality, photorealistic, 8k, detailed, professional photography`
  };

  // Detecta qué tipo de edición quiere
  if (base.includes('logo')) return templates.logo;
  if (base.includes('fondo') || base.includes('background')) return templates.fondo;
  if (base.includes('ropa') || base.includes('camisa') || base.includes('vestido')) return templates.ropa;
  if (base.includes('marca') || base.includes('branding')) return templates.branding;
  if (base.includes('producto')) return templates.producto;
  
  return templates.default;
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
    // Mejoramos el prompt automáticamente
    const enhancedPrompt = enhancePrompt(prompt);
    console.log('Original:', prompt);
    console.log('Enhanced:', enhancedPrompt);

    const output = await replicate.run(
      "philz1337x/clarity-upscaler:dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e",
      {
        input: {
          image: image,
          prompt: enhancedPrompt,
          negative_prompt: "blurry, low quality, text, watermark, distorted, deformed, bad anatomy",
          scale_factor: 1,
          scheduler: "DPM++ Karras",
          creativity: 0.35,
          resemblance: 0.7,
          guidance_scale: 7,
          num_inference_steps: 20
        }
      }
    );

    return res.status(200).json({ 
      output: output,
      usedPrompt: enhancedPrompt // Para debug
    });
  } catch (error) {
    console.error('Replicate error:', error);
    return res.status(500).json({ 
      error: 'Error al generar imagen', 
      details: error.message 
    });
  }
}
