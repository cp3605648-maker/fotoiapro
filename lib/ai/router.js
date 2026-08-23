import { PRESETS, NEGATIVE_PROMPT } from "./prompts";

function detectCommercialPreset(userPrompt = "", requestedPreset = "") {
  const text = String(userPrompt || "").toLowerCase();
  const requested = String(requestedPreset || "").toLowerCase().trim();

  // Primero respetamos el tipo seleccionado explícitamente
  // desde la interfaz de FotoIA Pro.
  if (requested && PRESETS[requested]) {
    return {
      key: requested,
      preset: PRESETS[requested],
    };
  }

  // Si no llegó un preset, intentamos detectarlo desde el texto.
  const priorityOrder = [
    "promotion",
    "menu",
    "flyer",
    "social",
    "catalog",
    "ad",
  ];

  for (const presetKey of priorityOrder) {
    const preset = PRESETS[presetKey];

    if (!preset) continue;

    const found = preset.keywords.some((keyword) =>
      text.includes(keyword.toLowerCase())
    );

    if (found) {
      return {
        key: presetKey,
        preset,
      };
    }
  }

  // Categoría comercial general por defecto.
  return {
    key: "ad",
    preset: PRESETS.ad,
  };
}

function getOrientationText(imageMeta) {
  if (!imageMeta) {
    return `
IMAGE ORIENTATION:
- Original orientation unknown.
- Preserve the natural proportions of the uploaded product.
- Choose a commercially useful composition.
`;
  }

  const { width, height, orientation } = imageMeta;

  return `
ORIGINAL IMAGE ANALYSIS:
- Width: ${width || "unknown"}.
- Height: ${height || "unknown"}.
- Orientation: ${orientation || "unknown"}.
- Adapt the final composition to the original image orientation unless the user explicitly requests another format.
- Keep the product naturally positioned and correctly scaled.
`;
}

function buildProductProtectionRules() {
  return `
PRODUCT IDENTITY LOCK:
- The uploaded product is the PRIMARY SUBJECT.
- Preserve the exact product identity.
- Preserve the product's shape.
- Preserve its proportions.
- Preserve its packaging.
- Preserve its materials and textures.
- Preserve its real colors.
- Preserve visible branding and logos.
- Preserve important product details.
- Do not redesign the product.
- Do not replace the product with another product.
- Do not invent a different model or version.
- Do not add product features that do not exist.
- Do not remove important product features.
- Do not duplicate the product unless the user explicitly requests multiple units.
- Do not deform, melt, stretch or alter the product.
- Keep the product physically realistic.
`;
}

function buildCommercialCompositionRules() {
  return `
COMMERCIAL COMPOSITION RULES:
- The uploaded product must remain visually important.
- Build the scene around the product, not the other way around.
- Use realistic perspective.
- Match lighting between product and environment.
- Match shadows between product and environment.
- Match reflections when appropriate.
- Maintain realistic scale.
- Avoid clutter.
- Avoid unnecessary decorative elements.
- Use professional commercial photography principles.
- Create a visually attractive image designed for a real business.
- Prioritize clarity and sales appeal.
`;
}

function buildBackgroundRules() {
  return `
BACKGROUND AND ENVIRONMENT:
- The background may change when the user requests a different environment.
- The environment must support the product.
- Use realistic depth of field.
- Match environmental lighting to the product.
- Avoid backgrounds that hide or compete with the product.
- Do not place the product in physically impossible locations.
`;
}

function buildLogoRules() {
  return `
BUSINESS LOGO / REFERENCE IMAGE:
- If a reference image is provided and it contains a business logo, treat it as the business branding reference.
- Preserve the logo design, colors, proportions and recognizable visual identity.
- Do not redesign or invent a different logo.
- Do not transform the logo into another symbol.
- Integrate the logo naturally into the requested advertising piece when appropriate.
- Do not place the logo over the main product unless the user requests it.
- Do not create additional fake brand logos.
- Do not invent business names or brand information.
`;
}

function buildTextRules() {
  return `
TEXT AND PROMOTIONAL INFORMATION:
- Do not invent prices.
- Do not invent discounts.
- Do not invent product claims.
- Do not invent phone numbers.
- Do not invent addresses.
- Do not invent websites or social media handles.
- If the user provides promotional information, treat it as intentional information.
- If the user does not request text, avoid unnecessary generated text.
- Never create random words or fake advertising claims.
`;
}

export function buildPrompt(
  userPrompt,
  isPaid,
  imageMeta = null,
  requestedPreset = ""
) {
  const cleanUserPrompt = String(userPrompt || "").trim();

  const selectedPresetData = detectCommercialPreset(
    cleanUserPrompt,
    requestedPreset
  );

  const selectedPreset = selectedPresetData.preset;
  const selectedPresetKey = selectedPresetData.key;

  const quality = isPaid
    ? `
ULTRA PREMIUM QUALITY:
- Ultra realistic professional commercial photography.
- Premium lighting.
- High detail.
- Natural textures.
- Accurate product materials.
- Professional advertising quality.
- Sharp commercial presentation.
`
    : `
STANDARD QUALITY:
- High quality realistic commercial photography.
- Natural lighting.
- Clean details.
- Professional product presentation.
`;

  return {
    prompt: `
FOTOIA PRO — COMMERCIAL PRODUCT ADVERTISING MODE

The purpose of this generation is to transform a real product photo into professional visual marketing material for a business.

IMPORTANT:
This is NOT a portrait editor.
This is NOT a personal photo transformation.
The uploaded image should be treated primarily as a PRODUCT PHOTOGRAPH.

SELECTED COMMERCIAL FORMAT:
${selectedPresetKey}

COMMERCIAL FORMAT INSTRUCTIONS:
${selectedPreset.prompt}

USER REQUEST:
${cleanUserPrompt || "Create a professional commercial presentation of this product."}

${getOrientationText(imageMeta)}

${buildProductProtectionRules()}

${buildCommercialCompositionRules()}

${buildBackgroundRules()}

${buildLogoRules()}

${buildTextRules()}

FINAL PRIORITY:
1. Preserve the real uploaded product.
2. Follow the user's explicit commercial request.
3. Follow the selected advertising format.
4. Maintain realistic lighting, perspective, materials and proportions.
5. Create a professional visual suitable for a real business.
6. Do not introduce unrelated people, objects or concepts.
7. Do not turn the product into a person or portrait.
8. Do not replace the product with an imaginary product.

${quality}
`,

    negativePrompt: `
${NEGATIVE_PROMPT}

PRODUCT PROTECTION NEGATIVE RULES:
changed product,
different product,
replacement product,
fake product,
invented product,
altered packaging,
altered product shape,
altered product proportions,
wrong product color,
wrong product material,
missing product details,
extra product,
duplicate product,
deformed product,
warped product,
melted product,
floating product,
unrealistic product,
fake branding,
fake logo,
altered logo,
incorrect logo,
fake business name,
fake price,
fake discount,
fake contact information,
random text,
unwanted text,
misspelled text,
watermark,
cluttered composition,
unrealistic perspective,
unrealistic shadows,
unrealistic reflections,
bad lighting,
low quality,
blurry,
distorted,
unrelated people,
portrait transformation,
face swap,
identity swap
`,
  };
}
