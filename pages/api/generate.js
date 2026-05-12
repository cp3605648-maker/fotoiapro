import Replicate from 'replicate';

const replicate = new Replicate({
  token: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { image, prompt } = req.body;

  if (!image || !prompt) {
    return res.status(400).json({ message: 'Image and prompt are required' });
  }

  try {
    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      {
        input: {
          input_image: image,
          prompt: prompt,
          num_steps: 50,
          guidance_scale: 5,
          style_name: "Photographic (Default)",
          negative_prompt: "ugly, blurry, poor quality",
          seed: 0,
          num_outputs: 1,
          output_quality: 95,
          background_type: "Auto",
          style_strength: 30,
          output_format: "webp",
          enhancement_option: "Face & Skin & Clothing & Everything",
          super_resolution: true,
          upscale_by_ratio: 2,
        }
      }
    );

    return res.status(200).json({ output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
