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
    "full body",
  ].some((word) => lower.includes(word));
}

function isSecondSubjectRequest(prompt = "", referenceImage) {
  if (!referenceImage) return false;

  const lower = prompt.toLowerCase();

  return [
    "foto con",
    "con esta persona",
    "junto",
    "junto a",
    "al lado",
    "al lado de",
    "abraz",
    "abrazo",
    "abrazando",
    "selfie",
    "conmigo",
    "pareja",
    "novia",
    "novio",
    "esposa",
    "esposo",
    "amigo",
    "amiga",
    "artista",
    "cantante",
    "actor",
    "actriz",
    "influencer",
    "deportista",
    "persona de referencia",
    "sujeto de referencia",
  ].some((word) => lower.includes(word));
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Método no permitido",
      });
    }

    const {
      image,
      referenceImage,
      prompt: userPrompt,
      isPaid,
      imageMeta,
    } = req.body;

    if (!image) {
      return res.status(400).json({
        error: "Falta imagen",
      });
    }

    const secondSubjectMode = isSecondSubjectRequest(
      userPrompt || "",
      referenceImage
    );

    const {
      prompt: finalPrompt,
      negativePrompt,
    } = buildPrompt(
      userPrompt || "",
      isPaid,
      imageMeta
    );

    const finalPromptWithReference = secondSubjectMode
      ? `${finalPrompt}

CRITICAL TWO-IMAGE COMPOSITION TASK:
- The primary uploaded image is the main person.
- The reference image is the secondary subject.
- The final image must show BOTH subjects together.
- Do not replace the primary subject.
- Do not transform the primary subject into the reference subject.
- Do not merge faces.
- Do not create a hybrid person.
- Preserve the primary subject face exactly.
- Add the reference subject as a separate person in the requested interaction.
- If the user asks for a hug, selfie, side-by-side pose or couple-style image, compose both people naturally in the same scene.
`
      : finalPrompt;

    let input = {
      prompt: finalPromptWithReference,
      input_image: image,
      negative_prompt: negativePrompt,
    };

    if (referenceImage) {
      input.reference_image = referenceImage;
    }

    console.log("GENERATE_INPUT_KEYS:", Object.keys(input));
    console.log("SECOND_SUBJECT_MODE:", secondSubjectMode);

    const output = await replicate.run(
      "black-forest-labs/flux-kontext-pro",
      { input }
    );

    return res.status(200).json({
      success: true,
      output: Array.isArray(output) ? output[0] : output,
      secondSubjectMode,
      referenceUsed: !!referenceImage,
    });
  } catch (error) {
    console.error("GENERATE_ERROR:", error);

    return res.status(500).json({
      error: "Error al generar",
      details: error.message,
    });
  }
}
