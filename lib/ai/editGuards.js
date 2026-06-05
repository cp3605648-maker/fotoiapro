export function buildFaceLockBlock({ userPrompt = "", allowExpressionChange = false } = {}) {
  const p = userPrompt.toLowerCase();

  const wantsFaceChange =
    allowExpressionChange ||
    /sonr[ií]e|triste|enojad|feliz|expresi[oó]n|cara|rostro|mirada|ojos|boca|sonrisa|edad|rejuvenece|envejece/.test(p);

  if (wantsFaceChange) {
    return `
IDENTITY PRESERVATION:
Keep the same person and identity from the original image.
Do not change age, ethnicity, facial structure, skin tone, or recognizable facial features unless explicitly requested.
`;
  }

  return `
STRICT FACE LOCK:
The face must remain EXACTLY the same as the original image.
Do NOT alter identity, eyes, nose, mouth, lips, smile, facial shape, jawline, cheeks, skin tone, age, expression, or recognizable facial details.
Preserve the original face, expression, and identity with maximum fidelity.
Only edit the requested non-facial elements.
If body pose changes, keep the original face unchanged and naturally attached to the body.
`;
}

export function detectPoseIntent(userPrompt = "") {
  const p = userPrompt.toLowerCase();

  const poseWords = [
    "pose", "movimiento", "salude", "saludar", "mano", "brazos", "cruza",
    "de pie", "sentada", "sentado", "caminando", "caminar", "corriendo",
    "mire", "mirando", "cielo", "voltee", "gire", "agachada", "agachado"
  ];

  return poseWords.some(w => p.includes(w));
}

export function buildPoseBlock({ userPrompt = "", imageMeta = {} } = {}) {
  const isPose = detectPoseIntent(userPrompt);
  if (!isPose) return "";

  const orientation = imageMeta?.orientation || "unknown";
  const aspect = imageMeta?.aspectRatio || "unknown";

  return `
INTELLIGENT POSE / MOVEMENT MODE:
Interpret the user's requested body movement naturally and accurately.

Original image orientation: ${orientation}
Original aspect ratio: ${aspect}

Pose requirements:
- Reconstruct the body pose according to the user's instruction.
- Preserve correct human anatomy.
- Keep head size, neck, shoulders, torso, arms, legs, and hands proportional.
- Hands must be realistic with correct number of fingers.
- Do not twist limbs unnaturally.
- Do not deform the face.
- Keep the same person, same clothing identity unless clothing change is requested.
- Match camera angle, lighting, perspective, and composition from the original image.
- If the person is sitting and user asks standing, create a natural standing pose.
- If the user asks waving/saluting, raise the arm naturally with realistic hand gesture.
- If the user asks looking somewhere, rotate head/eyes subtly while preserving identity.
- Avoid extra limbs, duplicated hands, warped fingers, melted anatomy, or distorted face.
`;
}

export function buildProfessionalEditPrompt({
  userPrompt = "",
  preset = "",
  imageMeta = {},
  basePrompt = ""
} = {}) {
  const faceLock = buildFaceLockBlock({ userPrompt });
  const poseBlock = buildPoseBlock({ userPrompt, imageMeta });

  return `
You are a professional AI photo editor.

USER REQUEST:
${userPrompt}

ACTIVE PRESET:
${preset || "free edit"}

${faceLock}

${poseBlock}

GLOBAL EDITING RULES:
- Follow the user's request precisely.
- Preserve the main subject identity.
- Maintain photorealistic quality unless a stylized preset is requested.
- Keep lighting, shadows, perspective, and body scale coherent.
- Do not introduce artifacts.
- Do not change anything the user did not ask to change.

${basePrompt || ""}
`;
}

export const HARD_NEGATIVE_PROMPT = `
changed face, different person, altered identity, distorted face, deformed face,
different eyes, different nose, different mouth, different smile, changed age,
bad anatomy, extra limbs, extra fingers, missing fingers, fused fingers,
deformed hands, warped hands, broken arms, twisted body, unnatural pose,
duplicate body, blurry face, melted face, asymmetrical face, low quality,
cartoon unless requested, plastic skin, uncanny face
`;
