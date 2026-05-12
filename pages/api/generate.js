import Replicate from "replicate";

export default async function handler(req, res) {
  // 1. DEBUG: Checa si el token existe
  if (!process.env.REPLICATE_API_TOKEN) {
    return res.status(500).json({
      error: "TOKEN_NO_ENCONTRADO",
      debug: "Ve a Vercel > Settings > Environment Variables y agrega REPLICATE_API_TOKEN"
    });
  }

  // 2. Si sí existe el token, seguimos
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
          prompt: "professional headshot, linkedin photo, studio lighting, 4k",
        }
      }
    );

    res.status(200).json({ photos: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error de Replicate",
      detail: error.message
    });
  }
}
}
