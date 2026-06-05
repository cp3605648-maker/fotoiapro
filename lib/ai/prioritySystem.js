export function buildPrioritySystemBlock(userPrompt = "") {
  const text = userPrompt.toLowerCase();

  const userAllowsFaceChange = [
    "cambia mi rostro",
    "cambia mi cara",
    "otro rostro",
    "otra cara",
    "cambia mi expresión",
    "cambia mi expresion",
    "sonrisa diferente",
    "hazme sonreír",
    "hazme sonreir",
    "envejecer",
    "rejuvenecer"
  ].some((item) => text.includes(item));

  return `
EDITING PRIORITY SYSTEM:

Priority 1 — Identity:
${userAllowsFaceChange
  ? "- The user requested a facial/expression adjustment. Preserve the same identity while applying only that requested facial change."
  : "- The user did not request a facial change. Preserve the exact same identity and face above all other edits."}

Priority 2 — Face preservation:
- Preserve facial structure, eyes, nose, mouth, lips, teeth, smile, cheeks, jawline, skin tone, age, expression, and recognizable identity.
- Never sacrifice face accuracy to satisfy background, style, clothing, pose, platform, or object changes.

Priority 3 — Natural anatomy:
- Keep body proportions realistic.
- Keep hands, fingers, arms, legs, torso, neck, shoulders, and head correctly connected and natural.

Priority 4 — User instruction:
- Apply the user's requested platform, background, objects, accessories, clothing, lighting, contrast, color, pose, and style.
- If multiple edits conflict, choose the version that best preserves identity and realism.

Priority 5 — Commercial quality:
- Make the final image polished, professional, clear, sharp, and visually useful for the requested purpose.

FAIL-SAFE RULE:
If a requested edit would strongly distort the face or identity, reduce the intensity of that edit and prioritize identity preservation.
`;
}
