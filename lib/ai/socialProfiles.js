export const SOCIAL_PLATFORM_PROFILES = [
{
key:"instagram_feed",
keywords:["instagram","feed instagram","post instagram"],
block:`
SOCIAL PLATFORM: Instagram Feed

Recommended aspect ratio: 4:5
Recommended size: 1080x1350

Composition:
- Subject dominant
- Mobile-first framing
- Strong visual hierarchy

Lighting:
- Bright editorial lighting
- Natural skin tones

Contrast:
- Vibrant but realistic

IDENTITY PRESERVATION:
- Preserve exact face
- Preserve age
- Preserve skin tone
- Preserve eyes
- Preserve expression

Goal:
High engagement Instagram post.
`
},

{
key:"instagram_story",
keywords:["story instagram","historia instagram","instagram story"],
block:`
SOCIAL PLATFORM: Instagram Story

Recommended aspect ratio: 9:16
Recommended size: 1080x1920

Composition:
- Vertical mobile format
- Subject centered
- Safe margins

IDENTITY PRESERVATION:
- Preserve exact identity

Goal:
Story-ready image.
`
},

{
key:"tiktok",
keywords:["tiktok","tik tok"],
block:`
SOCIAL PLATFORM: TikTok

Recommended aspect ratio: 9:16
Recommended size: 1080x1920

Composition:
- Face clearly visible
- Mobile-first design

Lighting:
- Bright
- High impact

IDENTITY PRESERVATION:
- Preserve exact identity

Goal:
TikTok optimized visual.
`
},

{
key:"youtube",
keywords:["youtube","thumbnail","miniatura youtube"],
block:`
SOCIAL PLATFORM: YouTube Thumbnail

Recommended aspect ratio: 16:9
Recommended size: 1280x720

Composition:
- Large face
- Strong silhouette
- Leave negative space for title

Lighting:
- High contrast
- Clickable visual

IDENTITY PRESERVATION:
- Preserve exact face

Goal:
High CTR thumbnail.
`
},

{
key:"linkedin",
keywords:["linkedin","linkedin premium"],
block:`
SOCIAL PLATFORM: LinkedIn

Recommended aspect ratio: 1:1
Recommended size: 2048x2048

Composition:
- Head and shoulders
- Professional crop

Lighting:
- Corporate
- Trustworthy

IDENTITY PRESERVATION:
- Preserve exact identity

Goal:
Professional profile image.
`
},

{
key:"whatsapp",
keywords:["whatsapp","perfil whatsapp"],
block:`
SOCIAL PLATFORM: WhatsApp Profile

Recommended aspect ratio: 1:1
Recommended size: 1080x1080

Composition:
- Circular crop safe
- Face centered

IDENTITY PRESERVATION:
- Preserve exact identity

Goal:
WhatsApp profile image.
`
},

{
key:"facebook_cover",
keywords:["portada facebook","facebook cover"],
block:`
SOCIAL PLATFORM: Facebook Cover

Recommended aspect ratio: Wide banner

Recommended size:
1640x624

Composition:
- Important content centered
- Cover-safe layout

IDENTITY PRESERVATION:
- Preserve exact identity

Goal:
Facebook cover image.
`
},

{
key:"pinterest",
keywords:["pinterest","pin"],
block:`
SOCIAL PLATFORM: Pinterest

Recommended aspect ratio: 2:3
Recommended size: 1000x1500

Composition:
- Vertical inspiration layout

IDENTITY PRESERVATION:
- Preserve exact identity

Goal:
Pinterest-ready content.
`
},

{
key:"twitter",
keywords:["twitter","x","x.com"],
block:`
SOCIAL PLATFORM: X / Twitter

Recommended aspect ratio:
16:9

Recommended size:
1600x900

Composition:
- Strong feed visibility

IDENTITY PRESERVATION:
- Preserve exact identity

Goal:
Twitter/X optimized post.
`
}
];

export function detectSocialPlatformBlock(userPrompt=""){

const text=userPrompt.toLowerCase();

const found=SOCIAL_PLATFORM_PROFILES.find(profile=>
profile.keywords.some(keyword=>
text.includes(keyword.toLowerCase())
)
);

return found ? found.block : "";

}
