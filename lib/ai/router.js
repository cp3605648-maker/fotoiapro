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

function buildCommercialSubtypeRules(
  preset = "",
  menuType = "",
  adType = "",
  flyerType = "",
  promotionType = "",
  marketplacePlatform = "",
  marketplaceImageType = ""
) {
  const rules = {
    menu: {
      full_menu: `
MENU TYPE: COMPLETE MENU
- Create a complete and organized food menu presentation.
- Use clear visual hierarchy and balanced sections.
- Leave intentional areas for client-provided names, prices or descriptions when requested.
- Make the composition suitable for presenting multiple dishes or products.
`,
      restaurant: `
MENU TYPE: RESTAURANT
- Create an elegant restaurant menu presentation.
- Favor appetizing food photography, refined spacing and professional dining aesthetics.
- Preserve the real appearance of every supplied food product.
`,
      cafe: `
MENU TYPE: CAFE
- Create a warm and attractive cafe-style menu.
- Favor coffee shop, bakery or casual premium presentation.
- Use inviting composition suitable for drinks, pastries and light food.
`,
      fast_food: `
MENU TYPE: FAST FOOD
- Create a bold, energetic and highly commercial fast-food menu.
- Make products immediately visible and appetizing.
- Favor strong hierarchy for combos, meals and featured items.
`,
      drinks: `
MENU TYPE: DRINKS
- Create a professional drinks menu.
- Highlight beverages clearly with refreshing, premium presentation.
- Preserve glassware, packaging, colors and actual product identity.
`,
      desserts: `
MENU TYPE: DESSERTS
- Create an appetizing dessert menu.
- Emphasize texture, detail, freshness and premium food styling.
- Keep the real dessert appearance faithful to the uploaded products.
`,
      combos: `
MENU TYPE: COMBOS AND PROMOTIONS
- Create a menu focused on grouped products, combos and meal deals.
- Present the included items together in a clear commercial composition.
- Do not invent prices, discounts or products.
`,
      whatsapp_menu: `
MENU TYPE: WHATSAPP
- Create a mobile-first menu optimized for viewing on a phone.
- Use strong visual hierarchy, readable spacing and vertically friendly composition.
- Keep the design easy to understand at small screen size.
`,
      screen_menu: `
MENU TYPE: DIGITAL SCREEN
- Create a menu suitable for television, monitor or digital signage.
- Favor wide, clean composition with strong product visibility.
- Make key items understandable from viewing distance.
`,
    },

    ad: {
      product_ad: `
AD TYPE: PRODUCT ADVERTISEMENT
- Make the real product the clear hero of the advertisement.
- Use persuasive commercial composition without inventing claims or text.
`,
      service_ad: `
AD TYPE: SERVICE ADVERTISEMENT
- Create a professional visual advertisement suitable for promoting a service.
- Use the uploaded product or brand asset only where visually relevant.
- Do not invent service details, prices or promises.
`,
      launch: `
AD TYPE: PRODUCT OR BRAND LAUNCH
- Create a high-impact launch composition.
- Give the product a new, premium and attention-grabbing presentation.
- Do not invent launch dates or claims.
`,
      commercial_offer: `
AD TYPE: COMMERCIAL OFFER
- Create a sales-focused advertising composition.
- Leave intentional visual space for exact offer text supplied by the client.
- Never invent prices, percentages or conditions.
`,
      brand_ad: `
AD TYPE: BRAND ADVERTISEMENT
- Create polished brand-oriented advertising.
- Favor premium visual identity, consistency and product recognition.
- Do not invent slogans or business information.
`,
    },

    flyer: {
      product_flyer: `
FLYER TYPE: PRODUCT
- Create a structured promotional flyer centered on the product.
- Include clear visual hierarchy and space for exact client-provided copy.
`,
      service_flyer: `
FLYER TYPE: SERVICE
- Create a professional flyer layout suitable for promoting a service.
- Do not invent phone numbers, addresses, prices or claims.
`,
      event_flyer: `
FLYER TYPE: EVENT
- Create an attention-grabbing event flyer composition.
- Leave clear areas for exact event information supplied by the client.
- Never invent dates, venues or contact details.
`,
      business_flyer: `
FLYER TYPE: BUSINESS
- Create a professional business promotional flyer.
- Balance brand presentation, product imagery and commercial hierarchy.
`,
      informational_flyer: `
FLYER TYPE: INFORMATIONAL
- Create a clean, organized informational flyer.
- Prioritize visual clarity and structured areas for client-provided information.
`,
    },

    promotion: {
      discount: `
PROMOTION TYPE: DISCOUNT
- Create a high-impact discount promotion.
- Only display a discount percentage if the client explicitly supplied it.
`,
      special_offer: `
PROMOTION TYPE: SPECIAL OFFER
- Create an attractive special-offer composition.
- Never invent the offer, price or conditions.
`,
      two_for_one: `
PROMOTION TYPE: 2X1
- Create a promotional composition suitable for a 2x1 offer.
- Only show 2x1 language if explicitly requested by the client.
`,
      combo: `
PROMOTION TYPE: COMBO
- Create a commercial combo presentation using only supplied products.
- Clearly group the products as one offer without inventing additional items.
`,
      clearance: `
PROMOTION TYPE: CLEARANCE
- Create a strong clearance-sale visual style.
- Do not invent discount amounts, expiration dates or pricing.
`,
      seasonal: `
PROMOTION TYPE: SEASONAL
- Create a promotion with an appropriate seasonal commercial atmosphere.
- Do not introduce unrelated seasonal products or claims.
`,
      featured_product: `
PROMOTION TYPE: FEATURED PRODUCT
- Create a premium hero composition focused on one featured product.
- Maximize product visibility and purchase appeal.
`,
    },
  };

  if (preset === "menu") {
    return rules.menu[menuType] || "";
  }

  if (preset === "ad") {
    return rules.ad[adType] || "";
  }

  if (preset === "flyer") {
    return rules.flyer[flyerType] || "";
  }

  if (preset === "promotion") {
    return rules.promotion[promotionType] || "";
  }

  return "";
}

function buildMarketplaceRules(
  platform = "",
  imageType = ""
) {
  const platformRules = {
    amazon: `
MARKETPLACE PLATFORM: AMAZON
- Create a clean ecommerce product image suitable for an Amazon product listing.
- Preserve the real product exactly.
- Do not invent accessories, packaging, colors, branding or product variations.
- Do not add watermarks, promotional badges, borders or unrelated graphics.
- Keep the product large, centered and clearly visible.

AMAZON MAIN IMAGE PRIORITY:
- If this is the MAIN image, completely remove the original background and environment.
- If this is the MAIN image, isolate ONLY the actual product being sold.
- Remove boxes, shelves, tables, hands, people, price labels, stickers, store displays and unrelated objects unless they are physically part of the product being sold.
- Do not preserve retail packaging unless the packaging itself is the product or the client explicitly asks to include it.
- Use a pure white background (#FFFFFF).
- Do not create shadows or scenery that make the background appear gray, beige or environmental.
- Do not add promotional text, prices, discounts, decorative typography, badges or lifestyle props.
- The final result should look like a professional isolated product catalog photograph.
`,
    mercadolibre: `
MARKETPLACE PLATFORM: MERCADO LIBRE
- Create a clean professional ecommerce image suitable for a Mercado Libre listing.
- Preserve the real product, packaging, color and proportions.
- Prioritize product visibility and a clean commercial presentation.
- Do not invent product characteristics, accessories, certifications, discounts or guarantees.
- Avoid watermarks, unrelated logos, contact information and misleading promotional elements.
- Keep the product easy to identify even at thumbnail size.
`,
    ebay: `
MARKETPLACE PLATFORM: EBAY
- Create a clear and accurate ecommerce product listing image.
- Show the real item being sold faithfully.
- Do not add advertising copy, promotional badges, borders, watermarks or unrelated artwork.
- Do not hide defects or materially change the product.
- Use a clean background and make the product easy to inspect.
`,
    shopify: `
MARKETPLACE PLATFORM: SHOPIFY
- Create a high-quality ecommerce product image suitable for an online store.
- Preserve the real product faithfully.
- Favor clean professional composition and consistent catalog presentation.
- Keep the product visually dominant.
- Do not invent text, claims, pricing or branding.
- The image should work well in a modern responsive storefront.
`,
  };

  const typeRules = {
    main: `
MARKETPLACE IMAGE TYPE: MAIN PRODUCT IMAGE
- Make the product the only clear hero subject.
- Keep the composition simple, clean and immediately understandable.
- Do not add promotional copy unless the platform explicitly allows it and the client supplied the exact text.
`,
    secondary: `
MARKETPLACE IMAGE TYPE: SECONDARY IMAGE

AMAZON SECONDARY IMAGE TARGET:
- Show ONLY the actual product being sold.
- Remove the retail box completely.
- Remove shelves, tables, hands, people, price labels, stickers, barcodes, store signs and all unrelated objects.
- Do not preserve the original store environment.
- Do not invent packaging, boxes, accessories or additional products.

PRODUCT PRESERVATION:
- Preserve the exact real product.
- Preserve its real shape.
- Preserve its real color.
- Preserve its real materials.
- Preserve its real branding.
- Preserve its real proportions.
- Preserve all legitimate visible product details.
- Do not redesign the product.
- Do not change the product model.
- Do not invent new product features.

COMPOSITION:
- Present the product in a clean professional 3/4 perspective.
- Use a three-quarter product view that clearly shows depth, side profile and front profile.
- Keep the product large and centered.
- Use a pure white background (#FFFFFF).
- Keep the background completely clean.
- Do not add lifestyle scenery.
- Do not add decorative objects.
- Do not add shadows that make the background appear gray or environmental.

TEXT AND LABELS:
- Do not generate prices.
- Do not generate promotional labels.
- Do not generate barcodes.
- Do not generate QR codes.
- Do not generate store information.
- Do not generate decorative text.
- Do not generate fake branding.

FINAL RESULT:
- The final image must look like a professional ecommerce studio photograph.
- Only the product should remain visible.
- The product must appear on a pure white background.
- The product must be shown from a clean 3/4 angle.
`,
    lifestyle: `
MARKETPLACE IMAGE TYPE: LIFESTYLE / PRODUCT IN USE

PRODUCT IDENTITY:
- Preserve the exact real product from the uploaded image.
- Preserve its real shape, color, materials, proportions, branding and visible details.
- Do not redesign, replace or create a different product.
- Do not invent accessories, packaging or product variations.

LIFESTYLE SCENE:
- Place the product in a realistic, believable environment where this type of product would naturally be used.
- The scene should communicate real-world use and commercial appeal.
- Keep the environment visually clean, premium and relevant to the product.
- Do not overload the scene with props or distracting objects.
- The product must remain the main visual subject.

COMPOSITION:
- Keep the product clearly visible and easy to identify.
- Use professional ecommerce and advertising photography.
- Use realistic perspective, lighting, shadows and depth.
- Do not crop important parts of the product.
- Do not hide important product details.

ACCURACY:
- Do not imply functionality, materials, benefits or features that are not visible or explicitly supplied by the client.
- Do not invent sizes, specifications, certifications or claims.

TEXT AND BRANDING:
- No prices.
- No discounts.
- No promotional badges.
- No fake labels.
- No QR codes.
- No invented advertising text.
- Do not invent or replace logos or branding.

FINAL RESULT:
- A professional lifestyle ecommerce photograph.
- The exact real product must be shown naturally in use or in a believable usage context.
- The scene should look suitable for an Amazon secondary listing image or commercial ecommerce presentation.
`,
    detail: `
MARKETPLACE IMAGE TYPE: PRODUCT DETAIL

PRODUCT IDENTITY:
- Preserve the exact real product from the uploaded image.
- Preserve its real color, materials, branding, proportions and visible construction.
- Do not redesign, replace or create a different product.
- Do not invent accessories, packaging or product variations.

DETAIL FOCUS:
- Create a professional close-up or detail-focused ecommerce photograph.
- Emphasize important visible materials, texture, stitching, finish, surface, edges, construction or craftsmanship.
- Choose a detail that is genuinely visible or strongly supported by the uploaded product.
- Keep the selected detail sharp, realistic and commercially attractive.

ACCURACY:
- Do not invent hidden components.
- Do not invent technical specifications.
- Do not invent materials that cannot be supported by the uploaded image.
- Do not create features, buttons, seams, logos, ports, fasteners or structures that are not present.
- Do not imply certifications, durability claims or performance claims.

COMPOSITION:
- Use professional macro or close-up ecommerce photography.
- Use realistic lighting and depth of field.
- Keep the product recognizable even when emphasizing a close detail.
- Avoid excessive blur that hides the actual product detail.
- Keep the composition clean and premium.

TEXT:
- No prices.
- No discounts.
- No fake labels.
- No promotional badges.
- No invented specifications.
- No QR codes.
- No advertising text unless explicitly supplied by the client.

FINAL RESULT:
- A professional ecommerce detail image highlighting a real visible characteristic of the exact uploaded product.
- The result should be suitable as an Amazon secondary/detail listing image.
`,
    infographic: `
MARKETPLACE IMAGE TYPE: COMMERCIAL INFOGRAPHIC

PRODUCT IDENTITY:
- Preserve the exact real product from the uploaded image.
- Preserve its real shape, color, materials, proportions, branding and visible details.
- Do not redesign, replace or create a different product.
- Do not invent accessories, packaging or product variations.

INFOGRAPHIC COMPOSITION:
- Create a clean professional ecommerce infographic-style composition.
- Keep the product as the main visual subject.
- Use clear visual hierarchy and organized callout areas.
- Use arrows, lines, icons or visual markers only when they help explain real visible product details.
- Keep the design suitable for an Amazon secondary listing image.

TEXT ACCURACY:
- Use ONLY exact facts, specifications, benefits, measurements or text explicitly supplied by the client.
- Do not invent product names.
- Do not invent dimensions.
- Do not invent materials.
- Do not invent technical specifications.
- Do not invent certifications.
- Do not invent guarantees.
- Do not invent performance claims.
- Do not invent safety claims.
- Do not invent promotional claims.
- Do not invent prices or discounts.

WHEN INFORMATION IS NOT PROVIDED:
- If the client does not provide exact informational text, do not generate fake specifications or placeholder marketing copy.
- Keep callout areas minimal and visually clean.
- Prefer a product-focused composition over invented text.
- Empty or purely visual callouts are preferable to fabricated information.

BRANDING:
- Preserve real visible product branding.
- Do not invent another logo.
- Do not redesign existing branding.
- Do not add unrelated business information, URLs, phone numbers, addresses or QR codes.

FINAL RESULT:
- A clean professional ecommerce infographic using only truthful, client-provided information.
- The product must remain accurate and recognizable.
- The result should be suitable as an Amazon secondary infographic image.
`,
  };

  return `
${platformRules[platform] || ""}

${typeRules[imageType] || ""}
`;
}

export function buildPrompt(
  userPrompt,
  isPaid,
  imageMeta = null,
  requestedPreset = "",
  hasReferenceImage = false,
  socialFormat = "",
  menuType = "",
  adType = "",
  flyerType = "",
  promotionType = "",
  marketplacePlatform = "",
  marketplaceImageType = ""
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

${buildCommercialSubtypeRules(
  selectedPresetKey,
  menuType,
  adType,
  flyerType,
  promotionType
)}

${selectedPresetKey === "marketplace"
  ? buildMarketplaceRules(
      marketplacePlatform,
      marketplaceImageType
    )
  : ""}

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
