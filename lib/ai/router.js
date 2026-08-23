import { PRESETS, NEGATIVE_PROMPT } from "./prompts";

function detectCommercialPreset(userPrompt = "", requestedPreset = "") {
  const text = String(userPrompt || "").toLowerCase();
  const requested = String(requestedPreset || "").toLowerCase().trim();

  if (requested && PRESETS[requested]) {
    return {
      key: requested,
      preset: PRESETS[requested],
    };
  }

  const priorityOrder = [
    "promotion",
    "menu",
    "flyer",
    "social",
    "catalog",
    "ad",
  ];

  for (const key of priorityOrder) {
    const preset = PRESETS[key];

    if (!preset) continue;

    const found = preset.keywords.some((keyword) =>
      text.includes(keyword.toLowerCase())
    );

    if (found) {
      return {
        key,
        preset,
      };
    }
  }

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
- Preserve natural proportions.
- Use a commercially useful composition.
`;
  }

  return `
ORIGINAL IMAGE:
- Width: ${imageMeta.width || "unknown"}.
- Height: ${imageMeta.height || "unknown"}.
- Orientation: ${imageMeta.orientation || "unknown"}.
- Preserve the natural proportions of the product.
- Adapt the commercial composition to the source image.
`;
}

function buildProductProtectionRules() {
  return `
PRODUCT IDENTITY LOCK:
- The uploaded image contains the real product.
- Preserve exact product identity.
- Preserve shape.
- Preserve proportions.
- Preserve packaging.
- Preserve materials.
- Preserve textures.
- Preserve real colors.
- Preserve existing product branding.
- Preserve important details.
- Do not redesign the product.
- Do not replace the product.
- Do not invent another model.
- Do not invent nonexistent features.
- Do not remove important features.
- Do not duplicate the product.
- Do not deform the product.
- Do not melt, stretch or warp the product.
- Keep realistic scale and perspective.
`;
}

function buildCommercialRules() {
  return `
COMMERCIAL COMPOSITION:
- Product is the primary subject.
- Build the scene around the product.
- Use realistic perspective.
- Match lighting.
- Match shadows.
- Match reflections.
- Use professional commercial photography principles.
- Avoid clutter.
- Avoid generic AI decoration.
- Maintain clear visual hierarchy.
- Produce a result suitable for a real business.
`;
}

function buildLogoRules(hasReferenceImage) {
  if (!hasReferenceImage) {
    return `
LOGO:
- No external logo reference was supplied.
- Do not invent a business logo.
- Do not create fake branding.
`;
  }

  return `
LOGO REFERENCE:
- The second image is the client's logo or brand reference.
- Preserve the exact logo.
- Preserve logo colors.
- Preserve logo proportions.
- Preserve recognizable identity.
- Integrate the logo naturally into the commercial piece.
- Treat the logo as an intentional brand element.
- Do not redesign the logo.
- Do not replace the logo.
- Do not distort the logo.
- Do not place the logo randomly.
- Do not cover the main product with the logo.
`;
}

function buildTextRules() {
  return `
CLIENT TEXT:
- The user description is intentional commercial information.
- Follow the client's requested wording and meaning.
- Never invent prices.
- Never invent discounts.
- Never invent phone numbers.
- Never invent addresses.
- Never invent websites.
- Never invent business names.
- Never invent product claims.
- Never invent promotional conditions.
- Never create random advertising copy.
`;
}

export function buildPrompt(
  userPrompt,
  isPaid,
  imageMeta = null,
  requestedPreset = "",
  hasReferenceImage = false
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
PREMIUM QUALITY:
- Ultra realistic commercial photography.
- Professional lighting.
- High detail.
- Accurate product materials.
- Premium advertising quality.
`
    : `
STANDARD QUALITY:
- High quality realistic commercial photography.
- Clean lighting.
- Accurate product presentation.
`;

  return {
    prompt: `
FOTOIA PRO — COMMERCIAL PRODUCT MARKETING

This is a commercial product transformation.

The uploaded product is the PRIMARY SUBJECT.

COMMERCIAL CATEGORY:
${selectedPresetKey}

CATEGORY INSTRUCTIONS:
${selectedPreset.prompt}

CLIENT DESCRIPTION:
${cleanUserPrompt || "Create a professional commercial presentation of this product."}

${getOrientationText(imageMeta)}

${buildProductProtectionRules()}

${buildCommercialRules()}

${buildLogoRules(hasReferenceImage)}

${buildTextRules()}

FINAL PRIORITY:
1. Preserve the real product.
2. Follow the selected commercial category.
3. Follow the client's description.
4. Integrate the logo naturally when supplied.
5. Maintain professional composition.
6. Maintain realistic lighting and perspective.
7. Avoid unrelated objects.
8. Do not turn the product into a person.
9. Do not replace the product.
10. Do not invent business information.

${quality}
`,

    negativePrompt: `
${NEGATIVE_PROMPT}

changed product,
different product,
replacement product,
fake product,
altered packaging,
altered shape,
wrong proportions,
wrong product color,
wrong material,
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
random text,
fake price,
fake discount,
fake phone number,
fake address,
fake website,
fake business name,
misspelled text,
unwanted text,
watermark,
cluttered composition,
unrealistic perspective,
unrealistic shadows,
unrealistic reflections,
bad lighting,
low quality,
blurry
`
  };
}
