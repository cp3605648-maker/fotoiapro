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

Editing instructions:
- Follow the user's request as the main priority.
- You may change clothing, outfit, background, location, colors, lighting, mood, scene style, and add requested objects if the user asks for them.
- Preserve the main person's facial identity, age appearance, body proportions, and natural anatomy.
- Keep the result photorealistic unless the user explicitly asks for anime, illustration, cyberpunk, poster, or editorial style.
- If changing clothing, make it fit naturally on the person.
- If changing background or location, blend the subject naturally with perspective, shadows, and lighting.
- If adding objects, place them realistically and avoid covering the face.
- If changing colors, keep them premium, clean, and visually balanced.
- Do not add extra people unless the user clearly asks for it.
- Do not distort hands, eyes, teeth, face, or body.

Quality:
${quality}
`,

    negativePrompt: `
${NEGATIVE_PROMPT}
deformed face, changed identity, extra fingers, missing fingers, bad hands,
distorted eyes, distorted mouth, duplicate person, extra people, plastic skin,
unrealistic anatomy, low quality, blurry, watermark, text artifacts, logo artifacts
`,
  };
}
