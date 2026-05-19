export function detectModel(userPrompt) {
  const lower = userPrompt.toLowerCase();

  const clothingKeywords = [
    "ropa",
    "outfit",
    "traje",
    "vestido",
    "camisa",
    "playera",
    "shirt",
    "dress",
    "fashion",
    "moda",
    "jacket",
    "chaqueta",
    "hoodie",
    "uniforme",
    "suit",
    "poner traje",
    "cambiar ropa",
    "vestirme",
    "ropa elegante",
    "ropa formal",
  ];

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
  ];

  if (clothingKeywords.some((keyword) => lower.includes(keyword))) {
    return "clothing";
  }

  if (instantIdKeywords.some((keyword) => lower.includes(keyword))) {
    return "instantid";
  }

  return "flux";
}
