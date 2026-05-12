import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function enhancePrompt(userInput, isPaid = false) {
  const base = userInput.toLowerCase();
  
  // Pagada = cambios fuertes. Demo = cambios sutiles + marca de agua
  const strength = isPaid? 'completely' : 'slightly';
  const quality = isPaid? '8k, professional' : 'demo quality';

  if (base.includes('playa') || base.includes('fondo') || base.includes('background')) {
    return `${strength} change the background to ${userInput}, keep the person identical, photorealistic, ${quality}`;
  }
  if (base.includes('ropa') || base.includes('camisa') || base.includes('vestido')) {
    return `${strength} change the clothes to ${userInput}, keep face and pose same, ${quality}`;
  }
  
  return `${strength} ${userInput}, keep the main subject unchanged, photorealistic, ${quality}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, prompt, userEmail } = req.body; // ← Recibimos el email para verificar pago

  if (!image || !prompt) {
    return res.status(400).json({ error: 'Image and prompt are required' });
  }

  try {
    // AQUÍ VERIFICAS SI EL USUARIO YA PAGÓ CON STRIPE
    // Por ahora lo simulamos. Después conectas con tu DB de Stripe
    const isPaid = userEmail === 'test@pagado.com'; // Temporal para pruebas
    
    const enhancedPrompt = enhancePrompt(prompt, isPaid);

    // MODELO CORRECTO PARA EDITAR
    const output = await replicate.run(
      "timbrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
      {
        input: {
          image: image,
          prompt: enhancedPrompt,
          num_inference_steps: isPaid? 50 : 20,
          image_guidance_scale: isPaid? 2.5 : 1.2,
          guidance_scale: 7.5
        }
      }
    );

    return res.status(200).json({ 
      output: output[0],
      isDemo: !isPaid,
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
