export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: "Correo requerido" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: "RESEND_API_KEY no está configurada en Vercel",
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "FotoIA Pro <no-reply@fotoia.pro>",
        to: email,
        subject: "Tu contraseña de FotoIA.pro fue actualizada",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <h2>Contraseña actualizada</h2>
            <p>Tu contraseña de FotoIA.pro fue cambiada correctamente.</p>
            <p>Si tú realizaste este cambio, no necesitas hacer nada más.</p>
            <p>Si no fuiste tú, contáctanos de inmediato en <strong>fotoiapro@outlook.com</strong>.</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "Resend rechazó el envío",
        details: data,
      });
    }

    return res.status(200).json({ ok: true, data });
  } catch (error) {
    return res.status(500).json({
      error: "Error enviando correo",
      details: error.message,
    });
  }
}
