export const NEGATIVE_PROMPT = `
blurry,
low quality,
bad anatomy,
deformed face,
extra fingers,
mutated hands,
duplicate body,
distorted eyes,
ugly,
cropped,
worst quality,
jpeg artifacts,
disfigured,
unnatural skin,
fake face,
cartoonish,
poor lighting,
oversaturated,
low resolution,
wrong proportions,
bad lighting,
bad composition,
text artifacts,
watermark
`;

export const PRESETS = {
  linkedin: {
    keywords: ["linkedin premium", "linkedin", "cv", "curriculum", "perfil profesional"],
    prompt: `
Professional LinkedIn profile photo.
Square 1:1 profile composition.
Chest-up framing.
Face centered and clearly visible.
Clean corporate background or modern office blur.
Professional business attire.
Confident but natural expression.
Soft front lighting.
Sharp eyes.
Natural skin texture.
High trust, employable, executive appearance.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  office: {
    keywords: ["oficina", "office", "trabajo", "ceo", "business", "executive", "corporativo"],
    prompt: `
Executive business portrait.
Modern luxury office environment.
Professional corporate photography.
Clean background.
Premium suit or business attire when requested.
Balanced contrast.
Soft professional lighting.
Confident posture.
High credibility and authority.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  ecommerce: {
    keywords: ["ecommerce", "shopify", "amazon", "producto", "tienda online"],
    prompt: `
Professional ecommerce product photography.
Square 1:1 commercial product composition.
Product centered and clearly visible.
Clean white, light gray, or premium lifestyle background.
Softbox lighting.
Accurate colors.
Sharp details.
Natural realistic shadow.
No clutter.
No text.
No fake logos.
Preserve product shape, material, color, proportions, and branding details.
Make the product look premium and sellable.
Ultra realistic commercial photography.
`,
  },

  influencer: {
    keywords: ["influencer", "instagram", "tiktok", "creator", "creador"],
    prompt: `
Premium social media influencer photo.
Strong subject separation.
Eye-catching but clean background.
Vibrant natural colors.
Bright editorial lighting.
Polished lifestyle aesthetic.
Instagram and TikTok ready.
High engagement visual style.
Modern personal branding.
Do not add text or logos.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  youtube: {
    keywords: ["youtube", "youtuber", "thumbnail", "miniatura"],
    prompt: `
YouTube creator thumbnail style portrait.
16:9 friendly composition.
Face large and expressive.
Strong contrast.
Bright clean lighting.
Clear silhouette.
Dynamic creator energy.
Leave negative space for future title text.
Do not generate text.
High click-through visual style.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  realestate: {
    keywords: ["real estate", "realtor", "inmobiliaria", "bienes raices"],
    prompt: `
Professional real estate branding portrait.
Modern property, luxury home, office, or architecture background.
Bright trustworthy lighting.
Clean corporate colors.
Confident approachable posture.
Premium business look.
Ideal for realtor profile, ads, business card, and property marketing.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  fashion: {
    keywords: ["fashion", "editorial", "vogue", "moda", "fashion editorial"],
    prompt: `
High-end fashion editorial photography.
Magazine-quality framing.
Luxury styling.
Strong model pose.
Premium outfit presentation.
Controlled dramatic lighting.
Elegant shadows.
Clean negative space.
Vogue-inspired commercial fashion campaign.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  wedding: {
    keywords: ["boda", "wedding", "novio", "novia"],
    prompt: `
Luxury wedding editorial photography.
Romantic elegant atmosphere.
Soft natural light.
Warm highlights.
Cinematic bokeh.
Premium wedding magazine style.
Elegant clothing and accessories when requested.
Emotional refined composition.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  travel: {
    keywords: ["travel", "viaje", "dubai", "paris", "luxury travel"],
    prompt: `
Luxury travel lifestyle photography.
Premium destination background.
Subject clearly visible.
Aspirational vacation mood.
Golden-hour or luxury editorial lighting.
Cinematic perspective.
Realistic scale, shadows, and atmosphere.
Social-media-ready travel aesthetic.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  beach: {
    keywords: ["playa", "beach", "mar", "vacaciones", "tropical"],
    prompt: `
Ultra realistic tropical beach photography.
Crystal clear ocean.
Palm trees.
Golden sunlight.
Clean vacation aesthetic.
Natural skin tones.
Professional travel composition.
Bright but balanced exposure.
Realistic sand, water, and shadows.
Preserve exact facial identity and body proportions.
Ultra realistic.
`,
  },

  luxury: {
    keywords: ["lujo", "luxury", "rico", "yate", "millonario", "vip"],
    prompt: `
Luxury lifestyle photography.
High-end fashion aesthetic.
Expensive environment.
Premium car, yacht, mansion, hotel, or luxury city background when requested.
Elegant composition.
Cinematic lighting.
Rich contrast.
Aspirational premium branding.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  fitness: {
    keywords: ["fitness", "gym", "musculoso", "ejercicio", "deportivo", "atlético"],
    prompt: `
Professional fitness photoshoot.
Athletic commercial aesthetic.
Gym, studio, or sports environment.
Strong but realistic body definition.
Dramatic fitness lighting.
Correct anatomy.
Natural muscle detail.
No exaggerated body distortion.
High-performance lifestyle branding.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  anime: {
    keywords: ["anime", "manga", "otaku", "studio ghibli"],
    prompt: `
High quality anime style portrait.
Modern anime aesthetic.
Clean linework.
Detailed anime lighting.
Beautiful composition.
Preserve hairstyle, facial identity, clothing idea, and personality.
Stylized but recognizable.
Studio quality anime artwork.
`,
  },

  cyberpunk: {
    keywords: ["cyberpunk", "futurista", "neon", "blade runner"],
    prompt: `
Cyberpunk futuristic city photography.
Neon lights.
Rainy reflective streets if appropriate.
Blade Runner aesthetic.
Futuristic fashion.
High contrast.
Cinematic atmosphere.
Sharp subject separation.
Preserve exact facial identity.
Ultra detailed.
`,
  },

  netflix: {
    keywords: ["netflix", "pelicula", "movie", "cinematic", "cine"],
    prompt: `
Cinematic movie poster portrait.
Netflix-style premium film lighting.
Dramatic atmosphere.
High-end color grading.
Strong storytelling mood.
Professional composition.
Sharp focus.
Realistic shadows.
No text.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  sunset: {
    keywords: ["atardecer", "sunset", "golden hour"],
    prompt: `
Beautiful cinematic golden hour photography.
Warm sunset light.
Orange sky.
Soft natural shadows.
Romantic premium atmosphere.
Balanced exposure.
Professional outdoor composition.
Preserve exact person identity.
Ultra realistic.
`,
  },
};
