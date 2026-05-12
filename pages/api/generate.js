import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST" });
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    return res.status(500).json({
      error: "TOKEN_NO_ENCONTRADO",
      debug: "Agrega REPLICATE_API_TOKEN en Vercel"
    });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No enviaste imagen" });
    }

    // SDXL-LCM: Rápido, acepta base64, hace img2img
    const output = await replicate.run(
      "lucataco/sdxl-lcm:fbbd475b083c0b86c78e6c796ce00d78d73d33e59141b6d3c8f0a0b2c0a0b0a0",
      {
        input: {
          image: image, // acepta data:image/jpeg;base64,...
          prompt: "professional headshot, linkedin photo, studio lighting, neutral background, 4k, sharp focus, high detail",
          negative_prompt: "blurry, lowres, bad anatomy, cartoon, painting, text, watermark, signature",
          prompt_strength: 0.5, // 0.5 = 50% tu foto, 50% IA
          num_inference_steps: 8, // LCM es rápido con 8 pasos
          guidance_scale: 2,
          width: 1024,
          height: 1024
        }
      }
    );

    return res.status(200).json({ photos: output });

  } catch (error) {
    console.error("Error Replicate:", error);
    // ESTO ES CLAVE: Mandamos el error real al frontend
    return res.status(500).json({
      error: "Error al generar con IA",
      detail: error.message || "Error desconocido de Replicate"
    });
  }
}
