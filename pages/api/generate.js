import Replicate from 'replicate';

const replicate = new Replicate({
  auth: 'r8_cgX6In5d9eQkUMK1B61l2uBdAxPpy6y13kZNH',
});

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;
    
    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      {
        input: {
          input_image: image,
          prompt: "a professional influencer photo, instagram style, beach in tulum mexico, sunset, 8k, photorealistic, high detail",
          num_steps: 20,
          style_strength: 30,
          num_outputs: 3,
          guidance_scale: 5
        }
      }
    );

    res.status(200).json({ photos: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando fotos' });
  }
}
