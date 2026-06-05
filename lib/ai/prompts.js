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
low resolution
`;

export const PRESETS = {
  beach: {
    keywords: ["playa", "beach", "mar", "vacaciones"],
    prompt: `
Ultra realistic tropical beach photography.
Crystal clear ocean.
Palm trees.
Golden sunlight.
Luxury vacation aesthetic.
Professional travel photography.
Preserve exact facial identity and body proportions.
Natural skin texture.
Cinematic lighting.
Highly detailed.
`,
  },

  office: {
    keywords: ["oficina", "office", "trabajo", "linkedin", "ceo"],
    prompt: `
Professional office portrait.
Modern luxury office.
Corporate photography.
LinkedIn premium style.
Natural lighting.
Elegant composition.
Professional business aesthetic.
Preserve exact facial identity.
Photorealistic.
`,
  },

  cyberpunk: {
    keywords: ["cyberpunk", "futurista", "neon", "blade runner"],
    prompt: `
Cyberpunk futuristic city.
Neon lights.
Cinematic atmosphere.
Blade Runner aesthetic.
Ultra detailed.
Futuristic fashion.
Professional sci-fi photography.
Preserve exact face identity.
Professional lighting.
`,
  },

  sunset: {
    keywords: ["atardecer", "sunset", "golden hour"],
    prompt: `
Beautiful cinematic sunset.
Orange clouds.
Golden hour lighting.
Ultra realistic photography.
Warm natural light.
Professional composition.
Preserve exact person identity.
Highly detailed.
`,
  },

  luxury: {
    keywords: ["lujo", "luxury", "rico", "yate", "millonario"],
    prompt: `
Luxury lifestyle photography.
High-end fashion aesthetic.
Elegant luxury environment.
Professional magazine style.
Cinematic lighting.
Expensive aesthetic.
Preserve exact face identity.
Ultra realistic.
`,
  },

  anime: {
    keywords: ["anime", "manga", "otaku"],
    prompt: `
High quality anime style portrait.
Modern anime aesthetic.
Detailed anime lighting.
Studio quality anime artwork.
Preserve facial identity and hairstyle.
Beautiful composition.
Highly detailed anime art.
`,
  },

  fitness: {
    keywords: ["fitness", "gym", "musculoso", "ejercicio"],
    prompt: `
Professional fitness photoshoot.
Athletic aesthetic.
Gym environment.
Strong cinematic lighting.
Luxury fitness campaign style.
Ultra realistic.
Preserve exact face identity.
Highly detailed muscles and anatomy.
`,
  },

  netflix: {
    keywords: ["netflix", "pelicula", "movie", "cinematic"],
    prompt: `
Netflix cinematic portrait.
Movie poster aesthetic.
Professional film lighting.
Cinematic atmosphere.
High-end color grading.
Ultra realistic.
Detailed photography.
Preserve exact facial identity.
`,
  },

  linkedin: {
    keywords: ["linkedin premium", "linkedin", "cv", "curriculum"],
    prompt: `
Professional LinkedIn portrait.
Executive business attire.
Premium corporate photography.
Clean background.
Professional lighting.
High trust appearance.
Preserve exact facial identity.
Ultra realistic.
`,
  },

  influencer: {
    keywords: ["influencer", "instagram", "tiktok", "creator"],
    prompt: `
Social media influencer photoshoot.
Premium content creator aesthetic.
Viral social media style.
Professional lighting.
Ultra realistic.
Preserve exact face identity.
`,
  },

  travel: {
    keywords: ["travel", "viaje", "dubai", "paris", "luxury travel"],
    prompt: `
Luxury travel photography.
Premium destination aesthetic.
Magazine quality.
Beautiful scenery.
Professional composition.
Preserve exact face identity.
`,
  },

  wedding: {
    keywords: ["boda", "wedding", "novio", "novia"],
    prompt: `
Luxury wedding photography.
Elegant romantic atmosphere.
Professional wedding editorial.
Beautiful natural lighting.
Preserve exact identity.
`,
  },

  fashion: {
    keywords: ["fashion", "editorial", "moda", "vogue"],
    prompt: `
Fashion editorial photography.
Magazine cover aesthetic.
Luxury styling.
Professional fashion campaign.
Preserve exact face identity.
`,
  },

  realestate: {
    keywords: ["real estate", "inmobiliaria", "realtor"],
    prompt: `
Professional real estate branding photo.
Business professional image.
Luxury property marketing aesthetic.
Corporate confidence.
Preserve exact identity.
`,
  },

  youtube: {
    keywords: ["youtube", "youtuber", "thumbnail"],
    prompt: `
Professional YouTube creator portrait.
High engagement visual style.
Content creator branding.
Clean composition.
Preserve exact identity.
`,
  },

  ecommerce: {
    keywords: ["ecommerce", "producto", "amazon", "shopify"],
    prompt: `
Professional ecommerce product photography style.
Commercial marketing quality.
Clean advertising composition.
Professional lighting.
Preserve exact identity.
`,
  },

};
