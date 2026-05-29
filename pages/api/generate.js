import Replicate from "replicate";
import { buildPrompt } from "../../lib/ai/router";
import { detectModel } from "../../lib/ai/modelRouter";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const rateLimitStore = new Map();
const LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MAX_IMAGE_LENGTH = 7_500_000;

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitStore.get(ip) || { count: 0, start: now };

  if (now - record.start > LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, start: now });
    return false;
  }

  record.count += 1;
  rateLimitStore.set(ip, record);

  return record.count > MAX_REQUESTS_PER_WINDOW;
}

function validateImage(image) {
  if (!image || typeof image !== "string") {
    return "Imagen inválida.";
  }

  if (image.length > MAX_IMAGE_LENGTH) {
    return "La imagen es demasiado pesada. Usa una imagen menor a 5MB.";
  }

  const validImage =
    image.startsWith("data:image/jpeg") ||
    image.startsWith("data:image/jpg") ||
    image.startsWith("data:image/png") ||
    image.startsWith("data:image/webp") ||
    image.startsWith("http://") ||
    image.startsWith("https://");

  if (!validImage) {
    return "Formato no permitido. Usa JPG, PNG o WEBP.";
  }

  return null;
}


function isPoseRequest(prompt = "") {
  const lower = prompt.toLowerCase();

  return [
    "pose",
    "movimiento",
    "de pie",
    "parado",
    "parada",
    "standing",
    "sentado",
    "sentada",
    "sitting",
    "caminar",
    "caminando",
    "walking",
    "saludar",
    "saludando",
    "mano",
    "wave",
    "waving",
    "girar",
    "mirando",
    "perfil",
    "cuerpo completo",
    "full body"
  ].some(word => lower.includes(word));
}


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    return res.status(500).json({ error: "Replicate no está configurado" });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: "Demasiadas solicitudes",
      details: "Espera un minuto antes de generar otra imagen.",
    });
  }

  const poseRequest = isPoseRequest(userPrompt);

const {
    image,
    referenceImage,
    imageMeta,
    prompt,
    preset,
    userId,
    isPaid = true,
  } = req.body || {};

  const userPrompt = prompt || preset;

  if (!userId) {
    return res.status(401).json({
      error: "Usuario no autenticado",
      details: "Inicia sesión para generar imágenes.",
    });
  }

  if (!image || !userPrompt) {
    return res.status(400).json({
      error: "Falta imagen o estilo",
      details: "Sube una imagen y selecciona un preset.",
    });
  }

  const imageError = validateImage(image);
  if (imageError) {
    return res.status(400).json({ error: imageError });
  }

  if (referenceImage) {
    const referenceError = validateImage(referenceImage);
    if (referenceError) {
      return res.status(400).json({
        error: "Imagen de referencia inválida",
        details: referenceError,
      });
    }
  }

  try {
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    const currentCredits = Number(profile.credits || 0);

    if (currentCredits <= 0) {
      return res.status(403).json({
        error: "Sin créditos",
        details: "Compra más créditos para continuar.",
      });
    }

    const { prompt: finalPrompt, negativePrompt } = buildPrompt(
      userPrompt,
      isPaid,
      imageMeta
    );

    const selectedModel = detectModel(userPrompt);

    let output;
    let modelUsed = selectedModel;

    if (referenceImage) {
      modelUsed = "multi-image-kontext-pro";

      output = await replicate.run("flux-kontext-apps/multi-image-kontext-pro", {
        input: {
          prompt: finalPrompt,
          input_image_1: image,
          input_image_2: referenceImage,
          aspect_ratio: "match_input_image",
          output_format: "png",
          safety_tolerance: 2,
        },
      });
    } else if (poseRequest) {
      modelUsed = "pose-aware-kontext-pro";

      output = await replicate.run("black-forest-labs/flux-kontext-pro", {
        input: {
          prompt: `${finalPrompt}

POSE INTERPRETATION MODE:
The user is asking for a pose, movement, body action, orientation or composition change.
Interpret the request intelligently and create the requested body pose even without a second reference image.
If the user asks standing, make the person standing.
If the user asks waving or greeting, raise the requested hand naturally.
If the user asks full body, show the complete body.
Preserve the exact face and identity from the original image.
Do not keep the original body pose if it conflicts with the requested action.
The requested movement has priority over the original pose.`,
          negative_prompt: negativePrompt,
          input_image: image,
          output_format: "jpg",
          guidance_scale: 4.8,
          num_inference_steps: 40,
        },
      });
    } else if (selectedModel === "instantid") {
      output = await replicate.run("zsxkib/instant-id", {
        input: {
          image,
          prompt: finalPrompt,
          negative_prompt: negativePrompt,
          enhance_face_region: true,
        },
      });
    } else {
      output = await replicate.run("black-forest-labs/flux-kontext-pro", {
        input: {
          prompt: finalPrompt,
          negative_prompt: negativePrompt,
          input_image: image,
          output_format: "jpg",
          guidance_scale: isPaid ? 3.5 : 2.5,
          num_inference_steps: isPaid ? 30 : 20,
        },
      });
    }

    const imageUrl = Array.isArray(output) ? output[0] : output;
    const creditsLeft = currentCredits - 1;

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ credits: creditsLeft })
      .eq("id", userId);

    if (updateError) throw updateError;

    const { error: generationError } = await supabaseAdmin
      .from("generations")
      .insert({
        user_id: userId,
        prompt: userPrompt,
        model_used: modelUsed,
        image_url: imageUrl,
        credits_used: 1,
        status: "completed",
      });

    if (generationError) {
      console.warn("No se pudo guardar generación:", generationError.message);
    }

    return res.status(200).json({
      output: imageUrl,
      creditsLeft,
      isDemo: false,
      modelUsed,
    });
  } catch (error) {
    console.error("Error generate:", error);

    return res.status(500).json({
      error: "Error al generar",
      details:
        error.message ||
        "Ocurrió un problema al generar la imagen. Intenta nuevamente.",
    });
  }
}
