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

    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          image: image,
          prompt: "professional headshot, linkedin photo, studio lighting, 4k"
        }
      }
    );

    return res.status(200).json({ photos: output });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error de Replicate",
      detail: error.message
    });
  }
}
