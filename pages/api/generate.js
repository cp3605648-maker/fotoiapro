import Replicate from "replicate";

const PROMPTS = {
  profesional: "professional headshot, linkedin photo, studio lighting, neutral background, 4k, sharp focus, photorealistic, business attire",
  producto: "professional product photography, white background, studio lighting, 4k, commercial photo, high detail, centered, e-commerce",
  negocio: "business lifestyle photo, modern office, confident pose, natural lighting, 4k, corporate environment, sharp focus"
};

export default async function handler(req, res) {
  if (req.method!== "POST") {
    return res.status(405).json({ error: "Solo POST" });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const { image, style = 'profesional', paid = false } = req.body;
    if (!image) return res.status(400).json({ error: "No enviaste imagen" });

    // AQUÍ VALIDARÍAS SI YA USÓ SU FOTO GRATIS
    // Por ahora lo dejamos pasar. Luego usas cookies/DB/Stripe
    if (!paid) {
      // Lógica para limitar 1 gratis va aquí después
    }

    const selectedPrompt = PROMPTS[style] || PROMPTS.profesional;

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a",
      {
        input: {
          image: image,
          prompt: selectedPrompt,
          negative_prompt: "blurry, lowres, bad anatomy, cartoon, painting, drawing, text, watermark, signature, deformed, ugly",
          prompt_strength: style === 'producto'? 0.6 : 0.4,
          num_inference_steps: 4,
          guidance_scale: 0
        }
      }
    );

    return res.status(200).json({ photos: output });

  } catch (error) {
    console.error("Error Replicate:", error);
    return res.status(500).json({
      error: "Error al generar con IA",
      detail: error.message
    });
  }
}
