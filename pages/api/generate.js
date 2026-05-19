import Replicate from 'replicate';
import { buildPrompt } from '../../lib/ai/router';
import { detectModel } from '../../lib/ai/modelRouter';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  const { image, prompt, isPaid, credits } = req.body;

  if (!image || !prompt) {
    return res.status(400).json({
      error: 'Falta imagen o descripción',
    });
  }

  if (credits <= 0) {
    return res.status(403).json({
      error: 'Sin créditos',
      details: 'Compra más créditos para continuar',
    });
  }

  try {

    const {
      prompt: finalPrompt,
      negativePrompt,
    } = buildPrompt(prompt, isPaid);

    const selectedModel = detectModel(prompt);

    let output;

    // CLOTHING MODE
    if (selectedModel === "clothing") {

      output = await replicate.run(
        "black-forest-labs/flux-kontext-pro",
        {
          input: {
            input_image: image,
            prompt: `
Change ONLY the clothing or outfit.

${finalPrompt}

Keep SAME face.
Keep SAME body.
Keep SAME pose.
Keep SAME hairstyle.
Do not modify identity.
Professional fashion photography.
`,
            negative_prompt: negativePrompt,
            output_format: "jpg",
            guidance_scale: 3,
            num_inference_steps: 30,
          }
        }
      );

    }

    // INSTANTID MODE
    else if (selectedModel === "instantid") {

      output = await replicate.run(
        "zsxkib/instant-id",
        {
          input: {
            image: image,
            prompt: finalPrompt,
            negative_prompt: negativePrompt,
            enhance_face_region: true,
          }
        }
      );

    }

    // FLUX NORMAL
    else {

      output = await replicate.run(
        "black-forest-labs/flux-kontext-pro",
        {
          input: {
            prompt: finalPrompt,
            negative_prompt: negativePrompt,
            input_image: image,
            output_format: "jpg",
            guidance_scale: isPaid ? 3.5 : 2.5,
            num_inference_steps: isPaid ? 30 : 20,
          }
        }
      );

    }

    return res.status(200).json({
      output,
      isDemo: !isPaid,
      creditsLeft: credits - 1,
      usedPrompt: finalPrompt,
      modelUsed: selectedModel,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Error al generar',
      details: error.message || 'Error interno al generar imagen',
    });

  }
}
