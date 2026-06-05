export const SOCIAL_PLATFORM_PROFILES = [
  {
    key: "instagram_story",
    keywords: ["instagram story", "historia de instagram", "stories", "story"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: Instagram Story.
- Recommended aspect ratio: 9:16.
- Recommended size: 1080x1920.
- Composition: vertical full-screen design, main subject centered, important details away from top and bottom UI areas.
- Lighting: bright, clean, attractive.
- Contrast: strong enough for mobile viewing.
- Goal: story-ready image for Instagram.
`
  },
  {
    key: "instagram_reel",
    keywords: ["instagram reel", "reel", "reels"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: Instagram Reel / vertical cover.
- Recommended aspect ratio: 9:16.
- Recommended size: 1080x1920.
- Composition: vertical mobile-first framing, subject centered, strong visual hook.
- Lighting: bright and social-media-ready.
- Contrast: high clarity for small screens.
- Goal: vertical reel-style image or cover.
`
  },
  {
    key: "instagram_feed",
    keywords: ["instagram", "post de instagram", "feed instagram"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: Instagram Feed.
- Recommended aspect ratio: 4:5.
- Recommended size: 1080x1350.
- Composition: mobile-first portrait crop, subject dominant, clean negative space.
- Lighting: polished lifestyle/editorial.
- Contrast: vibrant but realistic.
- Goal: high-engagement Instagram feed post.
`
  },
  {
    key: "tiktok",
    keywords: ["tiktok", "tik tok"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: TikTok.
- Recommended aspect ratio: 9:16.
- Recommended size: 1080x1920.
- Composition: vertical mobile-first crop, strong subject separation, face or product clearly visible.
- Lighting: bright, energetic, attention-grabbing.
- Contrast: high clarity and strong colors.
- Goal: TikTok-ready vertical visual.
`
  },
  {
    key: "facebook_story",
    keywords: ["facebook story", "historia de facebook"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: Facebook Story.
- Recommended aspect ratio: 9:16.
- Recommended size: 1080x1920.
- Composition: vertical full-screen crop, important subject centered.
- Lighting: bright and clean.
- Contrast: clear mobile visibility.
- Goal: Facebook story-ready image.
`
  },
  {
    key: "facebook_cover",
    keywords: ["portada de facebook", "facebook cover", "cover facebook"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: Facebook Cover.
- Recommended aspect ratio: wide horizontal banner.
- Recommended size: around 1640x624 or 851x315.
- Composition: wide layout, keep important subject and text-safe elements centered.
- Lighting: clean, professional, brand-friendly.
- Contrast: readable and visually strong.
- Goal: Facebook page/profile cover image.
`
  },
  {
    key: "facebook_feed",
    keywords: ["facebook", "post de facebook", "feed facebook"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: Facebook Feed.
- Recommended aspect ratio: 4:5 or 1:1.
- Recommended size: 1080x1350 or 1080x1080.
- Composition: mobile-first, subject clear, minimal clutter.
- Lighting: clean and professional.
- Contrast: strong enough for feed scrolling.
- Goal: Facebook post or ad-ready image.
`
  },
  {
    key: "whatsapp_status",
    keywords: ["estado de whatsapp", "whatsapp status", "status whatsapp"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: WhatsApp Status.
- Recommended aspect ratio: 9:16.
- Recommended size: 1080x1920.
- Composition: vertical mobile crop, subject centered, important details away from edges.
- Lighting: bright and clear.
- Contrast: mobile-friendly.
- Goal: WhatsApp status-ready image.
`
  },
  {
    key: "whatsapp_catalog",
    keywords: ["catalogo whatsapp", "catálogo whatsapp", "whatsapp business", "whatsapp catalog"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: WhatsApp Business Catalog.
- Recommended aspect ratio: 1:1.
- Recommended size: 1080x1080 or 1024x1024.
- Composition: product/service centered, clean background, no clutter.
- Lighting: even commercial lighting.
- Contrast: clear product visibility.
- Goal: WhatsApp Business catalog image.
`
  },
  {
    key: "whatsapp_profile",
    keywords: ["foto de perfil whatsapp", "perfil whatsapp", "whatsapp"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: WhatsApp Profile.
- Recommended aspect ratio: 1:1.
- Recommended size: 1080x1080.
- Composition: centered subject, circular crop-safe, keep face/logo away from edges.
- Lighting: clear, friendly, recognizable.
- Contrast: clean mobile visibility.
- Goal: WhatsApp profile image.
`
  },
  {
    key: "messenger",
    keywords: ["messenger", "facebook messenger"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: Messenger.
- Recommended aspect ratio: 1:1.
- Recommended size: 1080x1080.
- Composition: centered profile/share image, circular crop-safe when used as avatar.
- Lighting: clear and friendly.
- Contrast: clean visibility in small preview.
- Goal: Messenger profile or share-ready image.
`
  },
  {
    key: "youtube_thumbnail",
    keywords: ["miniatura youtube", "thumbnail youtube", "youtube thumbnail"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: YouTube Thumbnail.
- Recommended aspect ratio: 16:9.
- Recommended size: 1280x720 or 1920x1080.
- Composition: face/product large, expressive, strong silhouette, leave negative space for future text.
- Lighting: bright and punchy.
- Contrast: high click-through contrast.
- Goal: YouTube thumbnail-ready image.
`
  },
  {
    key: "linkedin_profile",
    keywords: ["perfil linkedin", "linkedin profile", "linkedin premium", "linkedin"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: LinkedIn Profile.
- Recommended aspect ratio: 1:1.
- Recommended size: 1024x1024 or 2048x2048.
- Composition: head and shoulders, face centered, professional crop.
- Lighting: soft, trustworthy, corporate.
- Contrast: clean professional contrast.
- Goal: LinkedIn profile-ready image.
`
  },
  {
    key: "pinterest",
    keywords: ["pinterest", "pin"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: Pinterest.
- Recommended aspect ratio: 2:3.
- Recommended size: 1000x1500.
- Composition: vertical inspirational layout, product or subject clear, premium lifestyle framing.
- Lighting: clean and attractive.
- Contrast: strong visual hierarchy.
- Goal: Pinterest pin-ready image.
`
  },
  {
    key: "x_twitter",
    keywords: ["twitter", "x twitter", "x.com", "post para x"],
    block: `
SOCIAL PLATFORM OPTIMIZATION: X / Twitter.
- Recommended aspect ratio: 16:9 or 1:1.
- Recommended size: 1600x900 or 1080x1080.
- Composition: clear subject, strong preview crop, minimal clutter.
- Lighting: clean and readable.
- Contrast: strong feed visibility.
- Goal: X/Twitter post-ready image.
`
  }
];

export function detectSocialPlatformBlock(userPrompt = "") {
  const text = userPrompt.toLowerCase();

  const found = SOCIAL_PLATFORM_PROFILES.find((profile) =>
    profile.keywords.some((keyword) => text.includes(keyword.toLowerCase()))
  );

  return found ? found.block : "";
}
