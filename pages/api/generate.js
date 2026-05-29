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
      prompt: `${finalPrompt}

STRICT FACE LOCK:
Preserve the exact same face from the original image.
Do not change facial identity, face shape, eyes, nose, mouth, teeth, smile, skin tone, age or expression.
Only transform body pose, clothing, background, lighting or objects.
The person must remain clearly recognizable as the same person.
Avoid face beautification, face replacement or face redesign.`,
      input_image: image,
      negative_prompt: `${negativePrompt}, changed face, different face, different person, altered identity, face swap, deformed face, distorted eyes, distorted mouth, bad teeth`,
      output_format: "jpg"
    };

    if (referenceImage) {
      input.reference_image = referenceImage;
    }

    if (poseRequest) {
      input.prompt += `

IMPORTANT:
When changing pose, keep the original face unchanged.
Only reconstruct the body pose, arms, hands and composition.

POSE INTERPRETATION MODE:
Interpret body movement intelligently.
If user requests waving or greeting,
create realistic hand movement.
If user requests standing,
change pose naturally.
Preserve exact face and identity.
Movement requested by user has priority
over original body posture.
`;
    }

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
