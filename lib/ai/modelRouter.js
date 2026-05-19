export function detectModel(userPrompt) {
  const lower = userPrompt.toLowerCase();

  // Prompts que necesitan mantener rostro REAL
  const instantIdKeywords = [
    "ceo",
    "linkedin",
    "luxury",
    "millonario",
    "rico",
    "netflix",
    "pelicula",
    "actor",
    "cinematic",
    "retrato",
    "portrait",
    "profesional",
    "business",
    "executive",
    "fashion",
  ];

  const useInstantID = instantIdKeywords.some((keyword) =>
    lower.includes(keyword)
  );

  return useInstantID
    ? "instantid"
    : "flux";
}
