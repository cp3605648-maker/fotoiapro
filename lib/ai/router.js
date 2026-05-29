import { PRESETS, NEGATIVE_PROMPT } from "./prompts";
import { INTENTS } from "./intents";

function detectTransformationType(text) {
  const lower = text.toLowerCase();

  const checks = [
    {
      type: "fashion",
      label: "clothing and outfit transformation",
      keywords: [
        "ropa", "vestido", "traje", "outfit", "camisa", "playera",
        "zapatos", "moda", "fashion", "elegante", "formal", "casual",
        "uniforme", "chaqueta", "saco", "pantalón", "pantalon"
      ],
    },
    {
      type: "location",
      label: "background and location transformation",
      keywords: [
        "fondo", "lugar", "ciudad", "playa", "new york", "nueva york",
        "paris", "tokyo", "tokio", "edificio", "calle", "oficina",
        "hotel", "lujo", "restaurante", "bosque", "montaña", "montana"
      ],
    },
    {
      type: "object",
      label: "object insertion or accessory addition",
      keywords: [
        "agrega", "añade", "anade", "pon", "objeto", "auto", "carro",
        "lamborghini", "ferrari", "moto", "reloj", "bolso", "gafas",
        "lentes", "joyas", "corona", "flores", "micrófono", "microfono"
      ],
    },
    {
      type: "color",
      label: "color and mood transformation",
      keywords: [
        "color", "colores", "dorado", "negro", "blanco", "azul",
        "rojo", "verde", "morado", "rosa", "neón", "neon",
        "oscuro", "claro", "pastel"
      ],
    },
    {
      type: "editorial",
      label: "editorial magazine transformation",
      keywords: [
        "revista", "portada", "editorial", "vogue", "gq", "forbes",
        "branding", "marca", "premium", "lujoso", "publicidad"
      ],
    },
    {
      type: "cinematic",
      label: "cinematic scene transformation",
      keywords: [
        "cinematografico", "cinematográfico", "pelicula", "película",
        "poster", "netflix", "drama", "luces", "iluminación",
        "iluminacion", "escena", "cine"
      ],
    },
    {
      type: "pose",
      label: "pose, body movement and composition transformation",
      keywords: [
        "pose", "posicion", "posición", "movimiento", "sentada", "sentado",
        "de pie", "parada", "parado", "caminando", "corriendo", "saludando",
        "mano levantada", "brazos cruzados", "mirando", "perfil", "cuerpo completo",
        "medio cuerpo", "primer plano", "encuadre", "orientacion", "orientación"
      ],
    },
  ];

  return checks
    .filter((check) =>
      check.keywords.some((keyword) => lower.includes(keyword))
    )
    .map((check) => check.label);
}

function detectPreset(userPrompt) {
  const lower = userPrompt.toLowerCase();

  for (const intent of Object.values(INTENTS)) {
    if (intent.keywords.some((keyword) => lower.includes(keyword))) {
      return PRESETS[intent.preset];
    }
  }

  for (const preset of Object.values(PRESETS)) {
    if (preset.keywords.some((keyword) => lower.includes(keyword))) {
      return preset;
    }
  }

  return null;
}

export function buildPrompt(userPrompt, isPaid) {
  const lowerPrompt = userPrompt.toLowerCase();
  const isPoseRequest =
    lowerPrompt.includes("pose") ||
    lowerPrompt.includes("movimiento") ||
    lowerPrompt.includes("de pie") ||
    lowerPrompt.includes("parado") ||
    lowerPrompt.includes("parada") ||
    lowerPrompt.includes("sentado") ||
    lowerPrompt.includes("sentada") ||
    lowerPrompt.includes("saludando") ||
    lowerPrompt.includes("caminando") ||
    lowerPrompt.includes("cuerpo completo") ||
    lowerPrompt.includes("mano levantada");

  const selectedPreset = detectPreset(userPrompt);
  const transformationTypes = detectTransformationType(userPrompt);

  const quality = isPaid
    ? "ultra realistic professional photo editing, premium commercial quality, sharp details, natural skin texture, high-end lighting"
    : "high quality realistic photo editing, natural lighting, clean details";

  const transformationContext =
    transformationTypes.length > 0
      ? `Transformation intent: ${transformationTypes.join(", ")}.`
      : "Transformation intent: general realistic image transformation.";

  const basePrompt = selectedPreset
    ? selectedPreset.prompt
    : "Professional realistic AI photo transformation.";

  return {
    prompt: `
${basePrompt}

User request:
${userPrompt}

${transformationContext}

${isPoseRequest ? `
Pose transformation priority:
- If the request asks for pose, movement, standing, sitting, walking, waving, greeting, full body, or body orientation, this is a MAJOR POSE TRANSFORMATION.
- Reconstruct the body pose according to the user's instruction.
- The pose change is more important than preserving the original body position.
- Preserve only the person's facial identity, face details, and recognizable appearance.
- It is allowed to change arms, legs, torso direction, body position, hand gesture, camera framing, and full-body composition.
- If original image is seated and user asks standing, convert to a realistic standing full-body pose.
- If user asks waving or greeting, create a natural raised hand gesture with correct fingers.
- Keep the face identical, but adapt the body naturally to the new requested action.
` : ``}
Editing instructions:
- Follow the user's request as the main priority.
- You may change clothing, outfit, background, location, colors, lighting, mood, scene style, pose, body position, composition, camera framing, and add requested objects if the user asks for them.
- If the user asks for a new pose or movement, reinterpret the body naturally while preserving the person's face and identity.
- If the person is sitting and the user asks to stand, create a realistic standing full-body pose with correct legs, arms, balance, perspective, shadows, and clothing fit.
- If the user asks for waving, greeting, walking, standing, sitting, turning, or looking in a direction, compose the body naturally and anatomically correct.
- Detect the original image orientation and adapt the result to the requested framing: portrait, full body, half body, close-up, landscape, or vertical social media composition.
- Keep the subject properly centered, aligned with the scene perspective, and naturally placed in the environment.
- Preserve the main person's facial identity, face shape, eyes, nose, mouth, skin tone, expression, age appearance, body proportions, and natural anatomy.
- Do not modify the face, facial structure, identity, age, expression, eyes, nose, mouth, teeth, or skin tone unless the user explicitly asks for a facial change.
- All transformations should focus on clothing, background, location, lighting, color, objects, mood, or style while keeping the person's face unchanged.
- Keep the result photorealistic unless the user explicitly asks for anime, illustration, cyberpunk, poster, or editorial style.
- If changing clothing, make it fit naturally on the person.
- If changing background or location, blend the subject naturally with perspective, shadows, and lighting.
- If adding objects, place them realistically and avoid covering the face.
- If changing colors, keep them premium, clean, and visually balanced.
- Do not add extra people unless the user clearly asks for it.
- Do not distort hands, fingers, arms, legs, eyes, teeth, face, or body.
- Hands must have natural fingers and realistic gestures, especially when waving or holding objects.
- Body movement must look physically possible, balanced, and natural.

Quality:
${quality}
`,

    negativePrompt: `
${NEGATIVE_PROMPT}
changed face, changed identity, altered facial features, different person, older face, younger face, deformed face, extra fingers, missing fingers, bad hands,
distorted eyes, distorted mouth, duplicate person, extra people, plastic skin,
unrealistic anatomy, low quality, blurry, watermark, text artifacts, logo artifacts
`,
  };
}
