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
fake price,
fake discount,
fake phone number,
fake address,
fake website,
fake business information,
`;

const COMMON_PRODUCT_RULES = `
PRODUCT IDENTITY LOCK:
- The uploaded product is the exact real product being advertised.
- Preserve its exact identity.
- Preserve shape.
- Preserve proportions.
- Preserve packaging.
- Preserve materials.
- Preserve textures.
- Preserve real colors.
- Preserve visible branding.
- Preserve visible logos printed on the product.
- Preserve important product details.
- Do not redesign the product.
- Do not replace it with another product.
- Do not invent a different model.
- Do not add nonexistent features.
- Do not remove important features.
- Do not duplicate the product unless explicitly requested.
- Do not deform, melt, stretch or warp the product.
- Keep realistic scale.
- Keep realistic perspective.
- The product must remain the primary subject.
`;

const COMMON_COMMERCIAL_RULES = `
COMMERCIAL QUALITY:
- Professional commercial photography.
- Premium realistic lighting.
- Natural shadows.
- Correct reflections.
- Physically believable materials.
- Strong visual hierarchy.
- Clean professional composition.
- High perceived value.
- The final result must look like a real professionally designed marketing asset.
- Avoid generic AI-looking scenes.
- Avoid unnecessary decoration.
- Avoid visual clutter.
`;

const LOGO_RULES = `
LOGO / BRAND REFERENCE:
- If a second reference image is provided, it contains the client's business logo or branding.
- Preserve the exact logo design.
- Preserve the logo proportions.
- Preserve the logo colors.
- Preserve the recognizable brand identity.
- Integrate the logo naturally into the commercial composition.
- The logo must look intentionally placed by a professional designer.
- Do not redesign the logo.
- Do not invent another logo.
- Do not create fake brand marks.
- Do not place the logo over the product unless explicitly requested.
- Do not distort the logo.
- Do not replace the logo with text.
`;

const TEXT_RULES = `
CLIENT INFORMATION:
- Treat information supplied by the client as intentional commercial information.
- Never invent prices.
- Never invent discounts.
- Never invent contact information.
- Never invent addresses.
- Never invent websites.
- Never invent product claims.
- Never invent business names.
- Never invent promotional conditions.
- Never create random advertising words.
- When exact client text is supplied, preserve its meaning and wording.
`;

export const PRESETS = {
  menu: {
    keywords: [
      "menu",
      "menú",
      "carta",
      "restaurante",
      "cafeteria",
      "cafetería",
      "comida",
      "platillo",
      "platillo del día",
      "platillo del dia",
      "bebida",
      "café",
      "cafe",
      "postre",
      "food"
    ],

    prompt: `
COMMERCIAL CATEGORY: RESTAURANT MENU

Create a professional restaurant-menu visual.

OBJECTIVE:
Present the food or beverage in an appetizing, premium and realistic way suitable for a restaurant menu.

LAYOUT:
- Clean restaurant-menu composition.
- Strong visual hierarchy.
- Food/product must be the main visual focus.
- Use elegant supporting elements only when appropriate.
- Leave controlled negative space for the client's exact text.
- Avoid overcrowding.
- Make the result easy to scan visually.

FOOD PHOTOGRAPHY:
- Professional food photography.
- Natural appetizing textures.
- Realistic ingredients.
- Controlled highlights.
- Natural shadows.
- Premium restaurant lighting.
- Believable serving environment.

DESIGN:
- Elegant.
- Clean.
- Premium.
- Contemporary.
- Suitable for printed menus and digital menus.

DO NOT:
- Turn the food into another dish.
- Add ingredients that are not present unless requested.
- Invent prices.
- Invent dish names.
- Invent restaurant information.
`
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
      "clientes"
    ],

    prompt: `
COMMERCIAL CATEGORY: ADVERTISEMENT

Create a professional advertising visual designed to attract customers and sell the product.

OBJECTIVE:
The product must immediately communicate commercial value.

LAYOUT:
- Product is the dominant visual element.
- Strong visual hierarchy.
- Clear focal point.
- Background supports the product.
- Controlled negative space for client information.
- Professional advertising composition.

VISUAL STYLE:
- Premium commercial advertising.
- Strong lighting.
- Realistic shadows.
- Professional contrast.
- Attractive but believable environment.
- High perceived value.

SALES COMMUNICATION:
- Make the product visually desirable.
- Communicate quality through composition.
- Do not invent claims.
- Do not invent offers.
- Do not invent prices.
`
  },

  flyer: {
    keywords: [
      "flyer",
      "volante",
      "folleto",
      "poster",
      "póster",
      "promocional",
      "pieza promocional"
    ],

    prompt: `
COMMERCIAL CATEGORY: PROMOTIONAL FLYER

Create a complete professional promotional flyer composition.

OBJECTIVE:
The result must look like a real commercial flyer, not simply a product photo.

LAYOUT:
- Strong headline area.
- Product as the primary visual.
- Supporting visual hierarchy.
- Clear information area.
- Clear call-to-action area when requested.
- Balanced margins.
- Professional spacing.
- Strong alignment.
- Avoid random decorative elements.

DESIGN:
- Modern commercial graphic design.
- Premium product photography integrated into the design.
- Strong contrast.
- Easy visual scanning.
- Suitable for digital advertising and printing.

IMPORTANT:
- Client-provided information has priority.
- Do not invent text.
- Do not invent prices or promotions.
`
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
      "story",
      "stories",
      "reel"
    ],

    prompt: `
COMMERCIAL CATEGORY: SOCIAL MEDIA CONTENT

Create a professional social-media advertising visual.

OBJECTIVE:
Stop the user's attention quickly while maintaining a premium business appearance.

LAYOUT:
- Strong visual focal point.
- Product immediately recognizable.
- Modern composition.
- Clear hierarchy.
- Space for short promotional information.
- Avoid overcrowding.
- Composition suitable for social media.

VISUAL STYLE:
- Modern.
- Premium.
- High contrast where appropriate.
- Attractive commercial lighting.
- Professional photography.
- Clean brand presentation.

SOCIAL MEDIA PRINCIPLES:
- The product must be understood immediately.
- Avoid excessive information.
- Make the visual compelling at small screen sizes.
- Maintain strong visual separation.
`
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
      "producto"
    ],

    prompt: `
COMMERCIAL CATEGORY: PRODUCT CATALOG

Create a professional ecommerce/catalog product image.

OBJECTIVE:
Present the product clearly and accurately so a customer can understand what is being sold.

LAYOUT:
- Product centered or professionally positioned.
- Product occupies an important portion of the frame.
- Clean margins.
- Controlled background.
- No unnecessary decoration.
- Clear product visibility.

VISUAL STYLE:
- Premium ecommerce photography.
- Clean lighting.
- Accurate colors.
- Sharp product details.
- Realistic natural shadow.
- Professional commercial presentation.

IMPORTANT:
- Product accuracy has higher priority than decoration.
- Preserve every important product characteristic.
- Do not create a different product.
`
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
      "hot sale"
    ],

    prompt: `
COMMERCIAL CATEGORY: PROMOTIONAL CAMPAIGN

Create a high-impact promotional advertising visual.

OBJECTIVE:
Make the product immediately attractive and communicate a real sales opportunity.

LAYOUT:
- Product remains the primary visual.
- Promotional information receives strong visual hierarchy.
- Clear focal point.
- Strong contrast.
- Controlled negative space.
- Professional call-to-action area when requested.

VISUAL STYLE:
- High-impact commercial advertising.
- Energetic but professional.
- Premium lighting.
- Strong product separation.
- Modern promotional aesthetic.

IMPORTANT:
- Only use promotional information supplied by the client.
- Never invent prices.
- Never invent discounts.
- Never invent promotional conditions.
`
  }
};

export function getCommercialPreset(presetKey) {
  if (!presetKey) return null;
  return PRESETS[presetKey] || null;
}
