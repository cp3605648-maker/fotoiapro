export const NEGATIVE_PROMPT = `
blurry,
low quality,
low resolution,
bad composition,
bad lighting,
oversaturated,
underexposed,
overexposed,
jpeg artifacts,
distorted product,
deformed product,
altered product shape,
wrong product proportions,
wrong product color,
missing product details,
extra products,
duplicate products,
floating objects,
unrealistic shadows,
unrealistic reflections,
messy background,
clutter,
fake logos,
altered branding,
misspelled text,
random text,
unwanted words,
watermark,
text artifacts,
`;

export const PRESETS = {
  menu: {
    keywords: [
      "menu",
      "menú",
      "carta",
      "restaurante",
      "comida",
      "platillo",
      "platillo del dia",
      "platillo del día",
      "bebida",
      "cafe",
      "café",
      "postre",
      "food",
    ],
    prompt: `
COMMERCIAL OUTPUT TYPE: RESTAURANT MENU

Create a professional commercial food presentation using the uploaded product or food image as the primary visual reference.

GOAL:
Make the product look appetizing, clean, premium and ready to be used in a restaurant menu, digital menu or promotional food material.

VISUAL DIRECTION:
- Professional food photography.
- Appetizing but realistic presentation.
- Clean premium composition.
- Natural food textures.
- Accurate product appearance.
- Attractive but believable lighting.
- Professional depth and separation.
- Elegant restaurant-quality presentation.
- Keep the food/product clearly recognizable.

COMPOSITION:
- Product should be the visual focus.
- Use a clean composition suitable for menu design.
- Leave appropriate visual breathing room around the product.
- Avoid unnecessary objects.
- Use a complementary restaurant or food environment only when appropriate.

PRODUCT PRESERVATION:
- Preserve the exact food/product identity.
- Do not invent a different dish.
- Do not change the main ingredients unless explicitly requested.
- Preserve recognizable colors, shape, size and presentation.

TEXT:
- Do not generate random text.
- If the user explicitly requests promotional text, follow the request carefully.
`,
  },

  ad: {
    keywords: [
      "anuncio",
      "publicidad",
      "advertisement",
      "ad",
      "anuncio publicitario",
      "campaña",
      "campaign",
      "ventas",
      "vender",
      "clientes",
    ],
    prompt: `
COMMERCIAL OUTPUT TYPE: ADVERTISEMENT

Create a professional advertising image using the uploaded product as the main commercial subject.

GOAL:
Create an attention-grabbing advertising visual designed to attract customers and communicate the value of the product.

VISUAL DIRECTION:
- Premium commercial advertising photography.
- Strong visual hierarchy.
- Product must immediately attract attention.
- Clean professional composition.
- Attractive lighting.
- Realistic shadows and reflections.
- Modern commercial aesthetic.
- High perceived value.
- Suitable for paid advertising and business promotion.

COMPOSITION:
- Product is the main visual focus.
- Create strong subject separation.
- Use a background that supports the product and business.
- Avoid visual clutter.
- Create enough negative space when useful for promotional copy.

PRODUCT PRESERVATION:
- Preserve the exact product.
- Do not redesign the product.
- Do not change its shape, color, packaging or important details.
- Do not invent another product.
- Preserve existing branding when visible.

TEXT:
- Do not generate random text.
- If the user requests text, promotion, discount or offer, prioritize that instruction.
`,
  },

  flyer: {
    keywords: [
      "flyer",
      "volante",
      "promocional",
      "folleto",
      "pieza promocional",
      "poster",
      "póster",
    ],
    prompt: `
COMMERCIAL OUTPUT TYPE: PROMOTIONAL FLYER

Create a professional promotional visual using the uploaded product as the main subject.

GOAL:
Create a visually strong commercial composition suitable for a flyer, promotional graphic or digital advertising piece.

VISUAL DIRECTION:
- Professional graphic-design-inspired composition.
- Premium commercial photography.
- Strong visual hierarchy.
- Product clearly visible.
- Attractive background related to the business.
- Balanced spacing.
- Modern promotional aesthetic.
- High visual impact without unnecessary clutter.

COMPOSITION:
- Product should dominate the visual hierarchy.
- Leave useful negative space for promotional information.
- Create a composition that can work in social media and printed promotional material.
- Keep all important product details visible.

PRODUCT PRESERVATION:
- Preserve the uploaded product exactly.
- Preserve packaging, shape, proportions, colors and recognizable details.
- Do not replace the product with another object.

TEXT:
- Do not invent random words.
- Only include text when explicitly requested by the user.
- If text is requested, prioritize the exact promotional information provided.
`,
  },

  social: {
    keywords: [
      "social",
      "redes sociales",
      "redes",
      "instagram",
      "facebook",
      "tiktok",
      "post",
      "publicación",
      "publicacion",
      "stories",
      "story",
      "reel",
    ],
    prompt: `
COMMERCIAL OUTPUT TYPE: SOCIAL MEDIA CONTENT

Create a professional social-media-ready visual using the uploaded product as the main subject.

GOAL:
Create an attractive commercial image designed to stop scrolling, communicate the product quickly and encourage customer interest.

VISUAL DIRECTION:
- Modern social media advertising aesthetic.
- Eye-catching but professional.
- Strong product visibility.
- Clean composition.
- Attractive lighting.
- Premium commercial photography.
- Clear visual hierarchy.
- Suitable for Instagram, Facebook and TikTok.

COMPOSITION:
- Product should be immediately recognizable.
- Strong subject separation.
- Use a visually interesting but relevant environment.
- Avoid clutter.
- Use negative space when useful for captions or promotional information.
- Keep the main product prominent.

PRODUCT PRESERVATION:
- Preserve exact product identity.
- Preserve packaging, colors, proportions and branding.
- Do not replace or redesign the product.
- Do not invent additional products unless requested.

TEXT:
- Do not generate random text.
- If the user provides promotional copy, use that information as the intended message.
`,
  },

  catalog: {
    keywords: [
      "catalogo",
      "catálogo",
      "catalog",
      "tienda",
      "tienda online",
      "ecommerce",
      "e-commerce",
      "shopify",
      "amazon",
      "mercado libre",
      "producto",
    ],
    prompt: `
COMMERCIAL OUTPUT TYPE: PRODUCT CATALOG

Create a professional product catalog image using the uploaded product as the primary subject.

GOAL:
Present the product clearly and professionally so customers can understand what is being sold.

VISUAL DIRECTION:
- Premium ecommerce product photography.
- Clean commercial presentation.
- Accurate colors.
- Sharp product details.
- Professional lighting.
- Realistic natural shadow.
- Minimal visual clutter.
- High perceived product quality.

COMPOSITION:
- Product centered or professionally positioned.
- Product should occupy an important portion of the frame.
- Maintain enough margin around the product.
- Background should support the product without distracting from it.
- Suitable for online catalogs, ecommerce stores and marketplaces.

PRODUCT PRESERVATION:
- Preserve exact product shape.
- Preserve exact packaging.
- Preserve colors.
- Preserve materials and textures.
- Preserve logos and visible branding.
- Do not invent features.
- Do not transform one product into another.

TEXT:
- Avoid unnecessary text.
- Do not generate fake product information.
`,
  },

  promotion: {
    keywords: [
      "promocion",
      "promoción",
      "descuento",
      "oferta",
      "ofertas",
      "2x1",
      "rebaja",
      "liquidacion",
      "liquidación",
      "lanzamiento",
      "especial",
      "black friday",
      "hot sale",
    ],
    prompt: `
COMMERCIAL OUTPUT TYPE: PROMOTIONAL CAMPAIGN

Create a high-impact promotional advertising visual using the uploaded product as the main subject.

GOAL:
Make the product immediately attractive and communicate a promotional or sales opportunity.

VISUAL DIRECTION:
- High-impact commercial advertising.
- Strong product focus.
- Energetic but professional visual style.
- Attractive lighting.
- Strong visual hierarchy.
- Premium promotional composition.
- Designed to encourage customer action.

COMPOSITION:
- Product remains the primary visual element.
- Promotional atmosphere should support the product.
- Use visual contrast to create attention.
- Leave appropriate space for promotional information.
- Avoid excessive decorative elements.

PRODUCT PRESERVATION:
- Preserve the exact uploaded product.
- Preserve packaging, colors, proportions and branding.
- Do not replace the product.
- Do not invent additional products.

PROMOTION:
- If the user provides a discount, offer, price, 2x1, launch or special promotion, treat it as important information.
- Do not invent prices, discounts or offers.
- Do not create random promotional claims.

TEXT:
- Do not generate random text.
- Follow explicitly provided promotional wording whenever possible.
`,
  },
};

export function getCommercialPreset(presetKey) {
  if (!presetKey) return null;

  return PRESETS[presetKey] || null;
}
