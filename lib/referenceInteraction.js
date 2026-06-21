export function buildReferenceInteraction(prompt = "") {
  const p = prompt.toLowerCase();

  const interactionWords = [
    "abraz",
    "abrazando",
    "abrazo",
    "junto",
    "junto a",
    "conmigo",
    "selfie",
    "foto con",
    "al lado",
    "al lado de",
    "acompañado",
    "acompañada",
    "con esta persona",
    "caminar",
    "caminando",
    "beso",
    "pareja",
    "novia",
    "novio",
    "esposa",
    "esposo",
    "amigo",
    "amiga",
    "familia",
    "hermano",
    "hermana",
    "mamá",
    "papá",
    "hijo",
    "hija",
    "celebrar",
    "celebrando",
    "grupo",
    "persona",
    "artista",
    "cantante",
    "actor",
    "actriz",
    "influencer",
    "deportista",
    "mascota",
    "perro",
    "gato"
  ];

  const wantsInteraction = interactionWords.some((word) => p.includes(word));

  if (!wantsInteraction) return "";

  return `
SECOND SUBJECT MODE ENABLED

The user wants the reference subject to appear with the original person.

Final image requirements:
- Keep the primary subject from the original image.
- Add the reference subject as a second independent subject.
- Show both subjects together in the same scene.
- Preserve the primary subject face and identity exactly.
- Preserve the reference subject as a separate person or subject.
- Do not merge faces.
- Do not swap identities.
- Do not create a hybrid face.
- Do not replace the original person.
- Do not make the original user's face look like the reference.
- Do not make the reference subject's face look like the original user.
- Keep both faces distinct, separate and recognizable.
- Make the interaction natural, realistic and physically possible.
`;
}
