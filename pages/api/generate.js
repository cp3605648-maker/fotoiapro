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

    // PHOTOMAKER: Usa tu foto para generar una versión profesional
    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      {
        input: {
          input_image: image,
          prompt: "img, professional headshot of a person, studio lighting, neutral background, linkedin photo, 4k, high detail",
          negative_prompt: "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
          num_steps: 20,
          style_name: "Photographic",
          style_strength_ratio: 20,
          num_outputs: 1,
          guidance_scale: 5,
          seed: Math.floor(Math.random() * 2147483647)
        }
      }
    );

    // PhotoMaker regresa array, lo devolvemos tal cual
    return res.status(200).json({ photos: output });

  } catch (error) {
    console.error("Error Replicate:", error);
    return res.status(500).json({
      error: "Error al generar con IA",
      detail: error.message
    });
  }
}
