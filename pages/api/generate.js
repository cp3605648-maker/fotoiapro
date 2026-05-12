import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST" });
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    return res.status(500).json({
      error: "TOKEN_NO_ENCONTRADO",
      debug: "Agrega REPLICATE_API_TOKEN en Vercel > Settings > Environment Variables"
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

    // SDXL IMG2IMG: Este SÍ acepta base64 y usa tu foto como base
    const output = await replicate.run(
      "lucataco/sdxl-img2img:9c3b6fe4f8ada97c95d4cdaf61c6dd59e7fd2b57e4e3e2a1a1d2c3b4c5d6e7f8",
      {
        input: {
          image: image, // acepta data:image/jpeg;base64,...
          prompt: "professional headshot, linkedin photo, studio lighting, neutral background, 4k, high detail, sharp focus",
          negative_prompt: "nsfw, lowres, bad anatomy, text, watermark, blurry, cartoon, painting, drawing",
          prompt_strength: 0.4, // 0.4 = mantiene 60% de tu foto original
          num_inference_steps: 30,
          guidance_scale: 7.5
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
