export function buildVisualRiskBlock(userPrompt = "", imageMeta = null) {
  const text = userPrompt.toLowerCase();

  const has = (words) => words.some((w) => text.includes(w));

  const simpleEdits = has([
    "brillo", "contraste", "nitidez", "color", "fondo", "background",
    "instagram", "linkedin", "whatsapp", "shopify", "youtube"
  ]);

  const mediumEdits = has([
    "ropa", "outfit", "traje", "vestido", "lentes", "reloj", "accesorio",
    "oficina", "playa", "ciudad", "dubai", "paris", "new york"
  ]);

  const complexEdits = has([
    "de pie", "sentado", "sentada", "caminando", "corriendo", "saltando",
    "bailando", "pose", "movimiento", "montando", "jugando", "saludando",
    "brazos cruzados", "cuerpo completo"
  ]);

  const orientation = imageMeta?.orientation || "unknown";
  const width = imageMeta?.width || "unknown";
  const height = imageMeta?.height || "unknown";

  let risk = "LOW";

  if (complexEdits) risk = "HIGH";
  else if (mediumEdits) risk = "MEDIUM";
  else if (simpleEdits) risk = "LOW";

  return `
VISUAL RISK ENGINE:

Original image metadata:
- Width: ${width}
- Height: ${height}
- Orientation: ${orientation}

Detected edit risk level: ${risk}

Risk interpretation:
- LOW risk edits: lighting, contrast, color, platform crop, background improvement.
- MEDIUM risk edits: clothing, accessories, objects, location replacement.
- HIGH risk edits: pose changes, movement, full-body reconstruction, walking, sitting, standing, running.

Execution rules by risk:

LOW RISK:
- Apply requested edit cleanly.
- Preserve original face and identity exactly.
- Avoid unnecessary changes.

MEDIUM RISK:
- Apply requested objects, clothing, accessories, or background carefully.
- Match perspective, shadows, lighting, color temperature, and scale.
- Added objects must fit naturally.
- Do not cover, stretch, distort, or redesign the face.

HIGH RISK:
- Prioritize identity preservation over pose accuracy.
- Reconstruct body posture naturally only as much as needed.
- Keep the same face unchanged and naturally attached to the body.
- Preserve head size, neck connection, shoulders, hands, fingers, torso, legs, and balance.
- Avoid impossible anatomy, extra limbs, warped hands, duplicated body parts, or distorted facial features.
- If the original image does not provide enough body information, generate a natural plausible body while keeping the exact facial identity.

FAIL SAFE:
If the requested edit is too complex, reduce pose intensity and produce the most realistic version possible while keeping the same person.
`;
}
