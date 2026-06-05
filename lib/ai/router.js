import { buildProfessionalEditPrompt, HARD_NEGATIVE_PROMPT } from "./editGuards";
import { PRESETS, NEGATIVE_PROMPT } from "./prompts";
import { INTENTS } from "./intents";

function detectIntent(userPrompt = "") {
  const text = userPrompt.toLowerCase();

  const has = (words) => words.some((w) => text.includes(w));

  return {
    pose: has([
      "pose", "movimiento", "de pie", "parado", "parada", "sentado",
      "sentada", "saludando", "caminar", "caminando", "corriendo",
      "mano levantada", "brazos cruzados", "cuerpo completo", "perfil",
      "mirando", "girar", "voltear"
    ]),
    fullBody: has(["cuerpo completo", "full body", "de cuerpo completo"]),
    waving: has(["saludando", "saludar", "mano levantada", "wave", "waving"]),
    standing: has(["de pie", "parado", "parada", "standing", "erguido"]),
    sitting: has(["sentado", "sentada", "sitting"]),
    fashion: has(["ropa", "outfit", "traje", "vestido", "moda", "fashion"]),
    location: has(["fondo", "lugar", "ciudad", "playa", "edificio", "new york", "nueva york"]),
    object: has(["agrega", "añade", "objeto", "auto", "carro", "reloj", "bolso", "gafas"]),
  };
}

function detectPreset(userPrompt = "") {
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

function getOrientationText(imageMeta) {
  if (!imageMeta) {
    return "Original orientation unknown. Keep composition natural and centered.";
  }

  const { width, height, orientation } = imageMeta;

  return `
Original image analysis:
- Width: ${width || "unknown"}.
- Height: ${height || "unknown"}.
- Orientation: ${orientation || "unknown"}.
- Adapt the final composition to this orientation unless the user asks for a different framing.
- Keep the person properly centered, naturally placed, and aligned with scene perspective.
`;
}

export function buildPrompt(userPrompt, isPaid, imageMeta = null) {
  const selectedPreset = detectPreset(userPrompt);
  const intent = detectIntent(userPrompt);

  const quality = isPaid
    ? "ultra realistic professional photography, premium commercial quality, sharp details, natural skin texture, high-end lighting"
    : "high quality realistic photo editing, natural lighting, clean details";

  const basePrompt = selectedPreset
    ? selectedPreset.prompt
    : "Professional realistic AI photo transformation.";

  const poseRules = intent.pose
    ? `
POSE AND MOVEMENT MODE:
- The user is requesting a body pose or movement change.
- Reconstruct the body pose according to the instruction.
- The new pose is more important than preserving the original body position.
- Preserve the exact face and identity, but change body posture naturally.
- If requested standing, make the person stand naturally with correct legs, feet, balance and body weight.
- If requested waving or greeting, raise the correct hand naturally with realistic fingers.
- If requested full body, create full-body framing with the whole person visible.
- Keep anatomy realistic: correct arms, legs, hands, fingers, torso, shoulders and perspective.
`
    : `
POSE RULES:
- Preserve the original pose unless the user clearly asks for a new pose or movement.
`;

  const identityRules = `
FACE AND IDENTITY LOCK:
- Preserve the exact same face.
- Do not change facial identity, face shape, eyes, nose, mouth, teeth, skin tone, age, expression or recognizable features.
- Do not beautify, age, de-age, replace, merge or redesign the face unless the user explicitly asks.
- All edits should focus on body pose, clothing, background, lighting, color, object, style or scene.
`;

  return {
    prompt: `
${basePrompt}

USER REQUEST:
${userPrompt}

${getOrientationText(imageMeta)}

${identityRules}

${poseRules}

GENERAL EDITING RULES:
- Follow the user request as the main priority.
- You may change clothing, outfit, background, place, lighting, colors, objects, mood, camera framing and body pose when requested.
- If changing clothing, make it fit naturally on the body.
- If changing location or background, match perspective, shadows and lighting.
- If adding objects, place them realistically and do not cover the face.
- If changing pose, make the movement physically possible and balanced.
- Keep the final image realistic unless the user asks for anime, illustration, poster, cyberpunk or editorial style.

QUALITY:
${quality}
`,

    negativePrompt: `
${NEGATIVE_PROMPT}
changed face, different person, altered identity, altered facial features,
older face, younger face, distorted face, bad eyes, bad teeth,
bad anatomy, broken body, twisted torso, floating limbs, deformed hands,
bad fingers, extra fingers, missing fingers, unnatural pose, unrealistic movement,
duplicate person, extra people, blurry, low quality, watermark, text artifacts
`,
  };
}
