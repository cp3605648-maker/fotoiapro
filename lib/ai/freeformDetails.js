export function buildFreeformDetailsBlock(userPrompt = "") {
  const text = userPrompt.toLowerCase();

  const sections = [];

  const has = (words) => words.some((w) => text.includes(w));

  const requestedIdentityChange = has([
    "cambia mi cara",
    "cambiar mi cara",
    "otro rostro",
    "otra cara",
    "hazme más joven",
    "hazme mas joven",
    "envejecer",
    "rejuvenecer",
    "cambia mi expresión",
    "cambia mi expresion"
  ]);

  sections.push(`
UNIVERSAL FREEFORM INTERPRETATION:
The user may describe any custom edit in natural language.
Interpret the full request as a professional photo editor.
Apply all requested elements together: place, objects, accessories, clothing, lighting, color, platform, crop, pose, background, mood, and style.

STRICT IDENTITY RULE:
${requestedIdentityChange
  ? "- The user explicitly requested a face/expression change. Preserve the person's identity while applying only the requested facial/expression change."
  : "- The user did NOT request a face change. Preserve the exact same face, identity, skin tone, age, facial structure, eyes, nose, mouth, smile, and main expression."}
- Do not replace the person.
- Do not beautify, redesign, age, de-age, or alter facial features unless explicitly requested.
- Any added object, background, clothing, lighting, contrast, or crop must not deform or modify the face.
`);

  // Tipos de edición
  if (has(["contraste", "contrast"])) {
    sections.push(`
EDITING CONTROL: Contrast.
- Increase or adjust contrast professionally if requested.
- Keep skin tones natural.
- Avoid harsh shadows on the face unless requested.
`);
  }

  if (has(["brillo", "brightness", "más luz", "mas luz", "ilumina", "iluminación", "iluminacion"])) {
    sections.push(`
EDITING CONTROL: Brightness / Lighting.
- Improve brightness and lighting naturally.
- Keep the face well-lit and realistic.
- Avoid overexposure or washed-out skin.
`);
  }

  if (has(["saturación", "saturacion", "color intenso", "colores vivos", "vibrante"])) {
    sections.push(`
EDITING CONTROL: Saturation / Color.
- Enhance color vibrancy professionally.
- Preserve realistic skin tone.
- Avoid oversaturation.
`);
  }

  if (has(["nitidez", "sharp", "enfocar", "más detalle", "mas detalle", "hd", "4k"])) {
    sections.push(`
EDITING CONTROL: Sharpness / Detail.
- Improve sharpness and detail.
- Keep natural texture.
- Avoid artificial plastic skin or artifacts.
`);
  }

  if (has(["blanco y negro", "black and white", "b/n"])) {
    sections.push(`
EDITING CONTROL: Black and white.
- Convert to high-quality black and white if requested.
- Maintain strong tonal balance and facial detail.
`);
  }

  // Orientación / formato
  if (has(["vertical", "story", "reel", "tiktok", "historia"])) {
    sections.push(`
FORMAT CONTROL: Vertical.
- Prefer 9:16 vertical composition when possible.
- Keep the subject centered and mobile-safe.
- Do not crop important facial features.
`);
  }

  if (has(["horizontal", "portada", "banner", "cover"])) {
    sections.push(`
FORMAT CONTROL: Horizontal / Banner.
- Prefer wide horizontal composition when possible.
- Keep the subject and important elements centered and safe from edge cropping.
`);
  }

  if (has(["cuadrada", "cuadrado", "perfil", "avatar", "shopify", "catalogo", "catálogo"])) {
    sections.push(`
FORMAT CONTROL: Square.
- Prefer 1:1 square composition when possible.
- Keep subject/product centered.
- Make it safe for profile or catalog cropping.
`);
  }

  // Fondos y lugares genéricos
  if (has(["fondo", "background", "escenario", "lugar", "ciudad", "playa", "mar", "oficina", "bosque", "montaña", "montana", "restaurante", "cafeteria", "cafetería", "calle", "parque", "hotel", "lujo", "dubai", "paris", "tokio", "new york", "nueva york"])) {
    sections.push(`
SCENE / BACKGROUND CONTROL:
- Apply the requested place or background naturally.
- Match perspective, depth, scale, shadows, color temperature, and lighting.
- The subject must look physically present in the new environment.
- Do not alter the face while changing the background.
`);
  }

  // Objetos y accesorios genéricos
  if (has(["agrega", "añade", "anade", "ponme", "ponle", "coloca", "objeto", "accesorio", "lentes", "gafas", "reloj", "bolso", "bolsa", "auto", "carro", "laptop", "celular", "flores", "sombrero", "gorra", "joya", "collar", "aretes"])) {
    sections.push(`
OBJECT / ACCESSORY CONTROL:
- Add requested objects or accessories realistically.
- Match object size, perspective, lighting, shadows, and physical placement.
- Objects must not cover or deform the face unless explicitly requested.
- If placed on the body or face, fit naturally and preserve identity.
`);
  }

  // Ropa
  if (has(["ropa", "outfit", "traje", "vestido", "camisa", "playera", "chamarra", "chaqueta", "saco", "uniforme", "elegante", "formal", "casual"])) {
    sections.push(`
CLOTHING CONTROL:
- Change or improve clothing only as requested.
- Make clothing fit naturally to the body.
- Preserve body proportions and facial identity.
- Match fabric texture, folds, lighting, and shadows.
`);
  }

  // Pose y movimiento libre
  if (has(["pose", "movimiento", "sentado", "sentada", "de pie", "parado", "parada", "caminando", "saludando", "brazos cruzados", "mirando", "volteando", "corriendo"])) {
    sections.push(`
POSE / MOVEMENT CONTROL:
- Apply the requested pose or movement naturally.
- Keep anatomy correct: hands, fingers, arms, shoulders, torso, legs, and balance.
- Keep the face identity unchanged and naturally attached to the body.
`);
  }

  // Estilos genéricos
  if (has(["cinematic", "cinemático", "cinematico", "anime", "cyberpunk", "premium", "lujo", "editorial", "revista", "profesional", "corporativo"])) {
    sections.push(`
STYLE CONTROL:
- Apply the requested visual style while preserving realism unless the style requires stylization.
- Keep the subject recognizable.
- Maintain professional composition, lighting, and color grading.
`);
  }

  sections.push(`
FINAL FREEFORM EXECUTION RULES:
- Read the entire user request and apply all details, not only keywords.
- If the user requests multiple things, combine them coherently in one image.
- Prioritize user instruction, then category/platform requirements, then visual quality.
- If a detail is ambiguous, choose the most natural, professional, commercial-looking interpretation.
- Do not add text, watermarks, logos, extra people, or random objects unless requested.
`);

  return sections.join("\n");
}
