import { PRESETS, NEGATIVE_PROMPT } from "./prompts";

export function buildPrompt(userPrompt, isPaid) {
  const lower = userPrompt.toLowerCase();

  let selectedPreset = null;

  for (const preset of Object.values(PRESETS)) {
    if (
      preset.keywords.some((keyword) =>
        lower.includes(keyword)
      )
    ) {
      selectedPreset = preset;
      break;
    }
  }

  const quality = isPaid
    ? "8k ultra detailed professional photography"
    : "high quality realistic photography";

  const basePrompt = selectedPreset
    ? selectedPreset.prompt
    : `
Professional realistic image editing.
Preserve exact facial identity.
Photorealistic.
${userPrompt}
`;

  return {
    prompt: `
${basePrompt}

${quality}

Do not change the person's identity.
Maintain natural anatomy.
Keep image realistic.
`,

    negativePrompt: NEGATIVE_PROMPT,
  };
}
