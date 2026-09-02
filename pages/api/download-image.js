export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Método no permitido." });
  }

  try {
    const { url, filename } = req.query;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL de imagen requerida." });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(url);
    } catch {
      return res.status(400).json({ error: "URL inválida." });
    }

    // Seguridad: solo permitimos imágenes entregadas por Replicate
    const allowedHosts = [
      "replicate.delivery",
      "pbxt.replicate.delivery",
    ];

    const validHost =
      allowedHosts.includes(parsedUrl.hostname) ||
      parsedUrl.hostname.endsWith(".replicate.delivery");

    if (!validHost) {
      return res.status(400).json({
        error: "Origen de imagen no permitido.",
      });
    }

    const imageResponse = await fetch(parsedUrl.toString());

    if (!imageResponse.ok) {
      throw new Error(
        `No se pudo obtener la imagen: ${imageResponse.status}`
      );
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const safeFilename = String(filename || "fotoia-publicidad.png")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/-+/g, "-");

    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"`
    );
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Cache-Control", "private, no-store");

    return res.status(200).send(buffer);
  } catch (error) {
    console.error("DOWNLOAD IMAGE ERROR:", error);

    return res.status(500).json({
      error: "No se pudo descargar la imagen.",
    });
  }
}
