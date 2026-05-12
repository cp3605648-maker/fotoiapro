import Replicate from "replicate";

export default async function handler(req, res) {
  // ESTO ES PARA DEBUGGEAR 👇
  if (!process.env.REPLICATE_API_TOKEN) {
    return res.status(500).json({
      error: "TOKEN_NO_ENCONTRADO",
      debug: "Revisa Environment Variables en Vercel"
    });
  }
  // HASTA AQUÍ 👆

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const { image } = req.body;

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
    res.status(500).json({ error: error.message });
  }
}
}
