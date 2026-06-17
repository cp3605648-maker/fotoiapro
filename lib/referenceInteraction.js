export function buildReferenceInteraction(prompt = "") {
  const p = prompt.toLowerCase();

  const interactionWords = [
    "abraz",
    "junto",
    "conmigo",
    "selfie",
    "al lado",
    "caminar",
    "caminando",
    "beso",
    "pareja",
    "novia",
    "novio",
    "amigo",
    "amiga",
    "celebrar",
    "celebrando",
    "grupo",
    "persona"
  ];

  const wantsInteraction = interactionWords.some(word =>
    p.includes(word)
  );

  if (!wantsInteraction) return "";

  return `
SECOND SUBJECT MODE ENABLED

Analyze reference image as secondary subject.

Keep original uploaded person unchanged.

Insert the secondary subject naturally.

Allow realistic interaction.

Preserve identity of original subject.

Maintain two separate recognizable people.

Do not blend faces.

Do not transfer facial features.

Do not modify original identity.
`;
}
