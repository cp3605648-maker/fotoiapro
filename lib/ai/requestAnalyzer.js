export function analyzeUserRequest(userPrompt = "") {
  const text = userPrompt.toLowerCase();

  const includes = (words) => words.some((w) => text.includes(w));

  const analysis = {
    platform: null,
    format: null,
    location: null,
    objects: [],
    accessories: [],
    outfit: null,
    editing: [],
    pose: null,
    style: null,
    commerceGoal: null,
    identityChangeRequested: false,
    risk: "LOW"
  };

  if (includes(["instagram", "reel", "story", "historia"])) {
    analysis.platform = "instagram";
    analysis.format = includes(["reel", "story", "historia"]) ? "9:16 vertical" : "4:5 feed";
  }

  if (includes(["tiktok", "tik tok"])) {
    analysis.platform = "tiktok";
    analysis.format = "9:16 vertical";
  }

  if (includes(["youtube", "miniatura", "thumbnail"])) {
    analysis.platform = "youtube";
    analysis.format = "16:9 thumbnail";
  }

  if (includes(["linkedin"])) {
    analysis.platform = "linkedin";
    analysis.format = "1:1 professional profile";
  }

  if (includes(["whatsapp"])) {
    analysis.platform = "whatsapp";
    analysis.format = "1:1 profile/catalog or 9:16 status depending on wording";
  }

  if (includes(["facebook"])) {
    analysis.platform = "facebook";
    analysis.format = includes(["portada", "cover"]) ? "wide cover" : "4:5 or 1:1 feed";
  }

  if (includes(["shopify", "amazon", "mercado libre", "ecommerce", "producto", "tienda online"])) {
    analysis.commerceGoal = "product/ecommerce conversion";
    analysis.format = "1:1 product-friendly";
  }

  if (includes(["playa", "mar", "orilla", "arena"])) analysis.location = "beach / ocean shoreline";
  if (includes(["oficina", "corporativo", "empresa"])) analysis.location = "modern office / corporate environment";
  if (includes(["dubai", "dubái"])) analysis.location = "Dubai luxury environment";
  if (includes(["paris", "parís"])) analysis.location = "Paris elegant city environment";
  if (includes(["new york", "nueva york", "nyc"])) analysis.location = "New York urban environment";
  if (includes(["tokio", "tokyo"])) analysis.location = "Tokyo modern city environment";
  if (includes(["bosque", "naturaleza"])) analysis.location = "forest / nature environment";
  if (includes(["restaurante", "cafeteria", "cafetería"])) analysis.location = "restaurant or cafe environment";

  const objectMap = [
    ["lamborghini", "Lamborghini car"],
    ["auto", "car"],
    ["carro", "car"],
    ["laptop", "laptop"],
    ["celular", "smartphone"],
    ["flores", "flowers"],
    ["silla", "chair"],
    ["mesa", "table"],
    ["reloj", "watch"],
    ["bolso", "bag"],
    ["bolsa", "bag"]
  ];

  for (const [key, value] of objectMap) {
    if (text.includes(key)) analysis.objects.push(value);
  }

  if (includes(["lentes", "gafas", "sunglasses"])) analysis.accessories.push("sunglasses");
  if (includes(["sombrero", "gorra"])) analysis.accessories.push("hat/cap");
  if (includes(["collar", "aretes", "joya", "joyería", "joyeria"])) analysis.accessories.push("jewelry");

  if (includes(["traje", "saco", "formal", "ejecutivo"])) analysis.outfit = "formal executive outfit";
  if (includes(["vestido"])) analysis.outfit = "dress";
  if (includes(["ropa casual", "casual"])) analysis.outfit = "casual outfit";
  if (includes(["deportivo", "fitness", "gym"])) analysis.outfit = "athletic outfit";

  if (includes(["contraste"])) analysis.editing.push("contrast adjustment");
  if (includes(["brillo", "más luz", "mas luz", "iluminación", "iluminacion"])) analysis.editing.push("brightness / lighting improvement");
  if (includes(["nitidez", "hd", "4k", "detalle"])) analysis.editing.push("sharpness / detail enhancement");
  if (includes(["saturación", "saturacion", "colores vivos", "vibrante"])) analysis.editing.push("color vibrancy");
  if (includes(["blanco y negro", "b/n"])) analysis.editing.push("black and white");

  if (includes(["sentado", "sentada"])) analysis.pose = "sitting";
  if (includes(["de pie", "parado", "parada"])) analysis.pose = "standing";
  if (includes(["caminando"])) analysis.pose = "walking";
  if (includes(["corriendo"])) analysis.pose = "running";
  if (includes(["saludando", "saludar"])) analysis.pose = "waving";
  if (includes(["brazos cruzados"])) analysis.pose = "crossed arms";
  if (includes(["mirando al cielo"])) analysis.pose = "looking up";

  if (includes(["cinematic", "cinemático", "cinematico"])) analysis.style = "cinematic";
  if (includes(["anime"])) analysis.style = "anime";
  if (includes(["cyberpunk"])) analysis.style = "cyberpunk";
  if (includes(["lujo", "luxury", "premium"])) analysis.style = "luxury premium";
  if (includes(["editorial", "revista", "vogue"])) analysis.style = "fashion editorial";

  if (includes([
    "cambia mi rostro",
    "cambia mi cara",
    "otro rostro",
    "otra cara",
    "rejuvenece",
    "envejece",
    "cambia mi expresión",
    "cambia mi expresion"
  ])) {
    analysis.identityChangeRequested = true;
  }

  if (analysis.pose || includes(["cuerpo completo", "movimiento", "saltando", "bailando"])) {
    analysis.risk = "HIGH";
  } else if (
    analysis.objects.length ||
    analysis.accessories.length ||
    analysis.outfit ||
    analysis.location
  ) {
    analysis.risk = "MEDIUM";
  }

  return analysis;
}

export function buildRequestAnalysisBlock(userPrompt = "") {
  const a = analyzeUserRequest(userPrompt);

  return `
REQUEST ANALYSIS ENGINE:
The user's natural-language request has been analyzed into structured editing goals.

Detected:
- Platform: ${a.platform || "not specified"}
- Recommended format: ${a.format || "use original image orientation unless another requirement applies"}
- Location/background: ${a.location || "not specified"}
- Objects to add/use: ${a.objects.length ? a.objects.join(", ") : "none detected"}
- Accessories: ${a.accessories.length ? a.accessories.join(", ") : "none detected"}
- Outfit: ${a.outfit || "not specified"}
- Editing adjustments: ${a.editing.length ? a.editing.join(", ") : "none detected"}
- Pose/movement: ${a.pose || "not specified"}
- Visual style: ${a.style || "not specified"}
- Commercial goal: ${a.commerceGoal || "not specified"}
- Identity change requested: ${a.identityChangeRequested ? "yes" : "no"}
- Complexity/risk: ${a.risk}

Execution:
- Use this structured analysis to understand the user's full request.
- Combine all detected goals into one coherent professional image.
- If the original text contains extra details not listed above, still follow them.
- Preserve identity unless identity change requested is yes.
- If goals conflict, prioritize identity, realism, and the main requested platform/purpose.
`;
}
