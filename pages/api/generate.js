import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function autoPrompt(text, isPaid) {
  const lower = text.toLowerCase();
  const strength = isPaid? 'High detail, 8k' : 'Good quality';
  
  if (lower.includes('playa') || lower.includes('beach')) {
    return `Change background to tropical beach with ocean and palm trees, sunny day. Keep person identical: same face, clothes, pose. Photorealistic, ${strength}`;
  }
  if (lower.includes('nueva york') || lower.includes('new york') || lower.includes('edificio')) {
    return `Change background to New York city street with tall buildings. Keep person identical: same face, clothes, pose. Photorealistic, ${strength}`;
  }
  if (lower.includes('atardecer') || lower.includes('sunset')) {
    return `Change background to beautiful sunset sky with orange clouds. Keep person identical: same face, clothes, pose. Photorealistic, ${strength}`;
  }
  if (lower.includes('oficina') || lower.includes('office')) {
    return `Change background to modern office interior. Keep person identical: same face, clothes, pose. Photorealistic, ${strength}`;
  }
  
  // Default: asume cambio de fondo
  return `Change background to: ${text}. Keep person identical: same face, clothes, pose. Photorealistic, ${strength}`;
}

export default async function handler(req, res) {
  const { image, prompt, isPaid, credits } = req.body;

  if (!image ||!prompt) {
    return res.status(400).json({ error: 'Falta imagen o descripción' });
  }

  if (credits <= 0) {
    return res.status(403).json({ 
      error: 'Sin créditos',
      details: 'Compra más créditos para continuar'
    });
  }

  try {
    const finalPrompt = autoPrompt(prompt, isPaid);

    const output = await replicate.run(
      "black-forest-labs/flux-kontext-pro",
      {
        input: {
          prompt: finalPrompt,
          input_image: image,
          output_format: "jpg",
          guidance_scale: isPaid? 3.5 : 2.5,
          num_inference_steps: isPaid? 30 : 20
        }
      }
    );

    return res.status(200).json({
      output: output,
      isDemo:!isPaid,
      creditsLeft: credits - 1,
      usedPrompt: finalPrompt
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Error al generar',
      details: error.message
    });
  }
}
