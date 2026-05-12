import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Prompt automático según lo que escriba el cliente
function autoPrompt(userInput, isPaid) {
  const text = userInput.toLowerCase();
  const quality = isPaid? '8k, professional, detailed' : 'demo quality';

  if (text.includes('playa') || text.includes('beach')) {
    return `change background to tropical beach with ocean and palm trees, sunny day, keep the person identical, photorealistic, ${quality}`;
  }
  if (text.includes('atardecer') || text.includes('sunset')) {
    return `change background to beautiful sunset sky with orange clouds, keep the person identical, photorealistic, ${quality}`;
  }
  if (text.includes('oficina') || text.includes('office')) {
    return `change background to modern office, professional lighting, keep the person identical, photorealistic, ${quality}`;
  }
  if (text.includes('camisa') || text.includes('ropa') || text.includes('clothes')) {
    return `change clothes to ${userInput}, keep face and body pose identical, realistic fabric, ${quality}`;
  }
  if (text.includes('logo')) {
    return `professional logo design, ${userInput}, vector style, clean background, ${quality}`;
  }

  // Default: asume que es cambio de fondo
  return `change background to ${userInput}, keep the person identical, photorealistic, ${quality}`;
}

export default async function handler(req, res) {
  const { image, prompt, userEmail, credits } = req.body;

  if (!image ||!prompt) {
    return res.status(400).json({ error: 'Falta imagen o descripción' });
  }

  // Verificar créditos
  if (credits <= 0) {
    return res.status(403).json({
      error: 'Sin créditos',
      details: 'No tienes créditos. Compra más para continuar.'
    });
  }

  try {
    // Si tiene email es porque pagó = versión Pro
    const isPaid =!!userEmail;
    const finalPrompt = autoPrompt(prompt, isPaid);

    const output = await replicate.run(
      "timbrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23d",
      {
        input: {
          image: image,
          prompt: finalPrompt,
          num_inference_steps: isPaid? 50 : 20,
          image_guidance_scale: isPaid? 2.5 : 1.5,
          guidance_scale: 7.5
        }
      }
    );

    return res.status(200).json({
      output: output[0],
      isDemo:!isPaid,
      usedPrompt: finalPrompt,
      creditsLeft: credits - 1 // Restamos 1 crédito
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Error al generar',
      details: error.message
    });
  }
}
