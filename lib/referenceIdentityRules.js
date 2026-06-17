export const REFERENCE_IDENTITY_RULES = `
REFERENCE SUBJECT SYSTEM — HIGHEST PRIORITY

PRIMARY SUBJECT = ORIGINAL USER PHOTO
SECOND SUBJECT = REFERENCE PHOTO

The original uploaded image contains the primary person.
The reference image contains a secondary independent subject.

The final image must contain BOTH subjects when the user asks for interaction, company, hugging, selfie, couple, friend, artist, celebrity-style person, family member, pet, or another person.

PRIMARY SUBJECT PROTECTION:
- Preserve the original user's face exactly.
- Do not change facial identity, facial structure, eyes, nose, mouth, jawline, skin tone, age, expression, or recognizable features.
- Do not replace the original person.
- Do not transfer reference facial features into the original face.
- Do not merge the original face with the reference face.

SECOND SUBJECT RULES:
- Treat the reference image as a separate second subject.
- Create a second independent person or subject based on the reference.
- Keep both subjects visually separate and recognizable.
- Do not blend identities.
- Do not average facial features.
- Do not create one hybrid person.
- Do not turn the primary subject into the reference subject.
- The secondary subject should resemble the reference image as closely as the model can while staying naturally integrated.

INTERACTION RULES:
Allowed interactions:
- standing together
- hugging
- taking a selfie
- sitting together
- walking together
- holding hands
- celebrating together
- posing side by side
- looking at camera together

SCENE CONSISTENCY:
- Match lighting, shadows, perspective, scale, depth, camera angle and environment.
- Make body positions realistic.
- Keep anatomy natural.
- Both subjects must belong naturally in the same scene.
`;
