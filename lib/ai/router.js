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
- Show the same real product from a useful commercial perspective.
- You may use a more descriptive composition while keeping the product accurate.
- Do not invent features or accessories.
`,
    lifestyle: `
MARKETPLACE IMAGE TYPE: LIFESTYLE / PRODUCT IN USE
- Place the real product in a believable usage context.
- The environment must support the product rather than distract from it.
- Do not alter the product design.
- Do not imply functionality that the product does not visibly support.
`,
    detail: `
MARKETPLACE IMAGE TYPE: PRODUCT DETAIL
- Emphasize important visible materials, finish, texture or construction details.
- Keep details faithful to the uploaded product.
- Do not invent unseen components or features.
`,
    infographic: `
MARKETPLACE IMAGE TYPE: COMMERCIAL INFOGRAPHIC
- Create a structured ecommerce infographic-style composition.
- Use only facts or exact text explicitly supplied by the client.
- Never invent specifications, measurements, benefits, certifications or product claims.
- If no exact informational text was supplied, keep visual callout areas clean rather than generating fake text.
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
  promotionType = ""
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
