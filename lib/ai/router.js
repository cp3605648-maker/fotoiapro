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

function buildSocialFormatRules(socialFormat = "") {
  const formats = {
    instagram_post: `
SOCIAL FORMAT:
- Platform: Instagram.
- Placement: Feed post.
- Aspect ratio: 1:1.
- Compose for a square mobile feed.
- Keep the product clearly visible at thumbnail size.
`,
    instagram_story: `
SOCIAL FORMAT:
- Platform: Instagram.
- Placement: Story.
- Aspect ratio: 9:16.
- Use a vertical mobile-first composition.
- Keep important elements away from extreme top and bottom edges.
`,
    instagram_reel: `
SOCIAL FORMAT:
- Platform: Instagram.
- Placement: Reel cover / vertical social creative.
- Aspect ratio: 9:16.
- Use a strong vertical focal composition.
- Keep the product readable on a phone screen.
`,
    facebook_post: `
SOCIAL FORMAT:
- Platform: Facebook.
- Placement: Feed post.
- Aspect ratio: 1:1.
- Use a clear square advertising composition.
`,
    facebook_story: `
SOCIAL FORMAT:
- Platform: Facebook.
- Placement: Story.
- Aspect ratio: 9:16.
- Use a vertical mobile-first advertising composition.
`,
    tiktok: `
SOCIAL FORMAT:
- Platform: TikTok.
- Placement: Vertical social creative.
- Aspect ratio: 9:16.
- Use an immediate visual focal point.
- Keep the product prominent and easy to understand on mobile.
`,
    whatsapp_status: `
SOCIAL FORMAT:
- Platform: WhatsApp.
- Placement: Status.
- Aspect ratio: 9:16.
- Use a clean vertical mobile composition.
`,
    linkedin_post: `
SOCIAL FORMAT:
- Platform: LinkedIn.
- Placement: Feed post.
- Aspect ratio: 16:9.
- Use a polished professional business composition.
`,
    x_post: `
SOCIAL FORMAT:
- Platform: X / Twitter.
- Placement: Feed post.
- Aspect ratio: 16:9.
- Use a strong horizontal social-media composition.
`,
    pinterest_pin: `
SOCIAL FORMAT:
- Platform: Pinterest.
- Placement: Pin.
- Aspect ratio: 2:3.
- Use a vertical composition optimized for visual discovery.
`,
  };

  return formats[socialFormat] || "";
}

function buildTextRules() {
  return `
TEXT CONTROL:
- Do not generate any visible text unless the client explicitly supplied that exact text in the description.
- If the client did not provide exact wording to display, the final image must contain no added text.
- Do not turn instructions or category names into visible text.
- Do not render internal prompt instructions as text.
- Never display the words used to describe the requested style or category.
- Never invent headlines.
- Never invent slogans.
- Never invent calls to action.
- Never invent prices.
- Never invent discounts.
- Never invent phone numbers.
- Never invent addresses.
- Never invent websites.
- Never invent business names.
- Never invent product claims.
- Never invent promotional conditions.
- Never create random advertising copy.
- Never create placeholder text.
- Never create gibberish or decorative typography.
- Existing legitimate text printed on the real product should be preserved as part of the product identity.
`;
}

export function buildPrompt(
  userPrompt,
  isPaid,
  imageMeta = null,
  requestedPreset = "",
  hasReferenceImage = false,
  socialFormat = ""
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
This is a commercial product transformation.

The uploaded product is the PRIMARY SUBJECT.

COMMERCIAL CATEGORY:
${selectedPresetKey}

CATEGORY INSTRUCTIONS:
${selectedPreset.prompt}

CLIENT DESCRIPTION:
${cleanUserPrompt || "Create a professional commercial presentation of this product."}

${getOrientationText(imageMeta)}

${selectedPresetKey === "social" ? buildSocialFormatRules(socialFormat) : ""}

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
11. Do not add visible text unless the client explicitly provided the exact text to display.

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
