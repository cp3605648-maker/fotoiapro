import Replicate from "replicate";
import { buildPrompt } from "../../lib/ai/router";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

function isPoseRequest(prompt = "") {
  const lower = prompt.toLowerCase();

  return [
    "pose",
    "movimiento",
    "de pie",
    "parado",
    "parada",
    "saludar",
    "saludando",
    "mano",
    "standing",
    "wave",
    "waving",
    "cuerpo completo",
    "full body"
  ].some(word => lower.includes(word));
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Método no permitido"
      });
    }

    const {
      image,
      referenceImage,
      prompt: userPrompt,
      isPaid,
      imageMeta
    } = req.body;

    if (!image) {
      return res.status(400).json({
        error: "Falta imagen"
      });
    }

    const poseRequest = isPoseRequest(userPrompt || "");

  const {
    prompt: finalPrompt,
    negativePrompt
  } = buildPrompt(
    userPrompt || "",
    isPaid,
    imageMeta
  );

  let input = {
    prompt: finalPrompt,
    input_image: image,
    negative_prompt: negativePrompt
  };

const output = await replicate.run(
      "black-forest-labs/flux-kontext-pro",
      { input }
    );

    return res.status(200).json({
      success: true,
      output: Array.isArray(output)
        ? output[0]
        : output
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error al generar",
      details: error.message
    });
  }
}
