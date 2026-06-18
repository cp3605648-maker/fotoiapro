export async function sendPurchaseEmail({ email, credits, amount, currency }) {
  if (!email || !process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return;

  const formattedAmount =
    amount ? `$${(amount / 100).toFixed(2)} ${String(currency || "MXN").toUpperCase()}` : "";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Tu compra de créditos FotoIA Pro fue exitosa",
      html: `
        <h2>Gracias por tu compra en FotoIA Pro</h2>
        <p>Tu pago fue confirmado correctamente.</p>
        <p><strong>Créditos agregados:</strong> ${credits}</p>
        <p><strong>Total pagado:</strong> ${formattedAmount}</p>
        <p>Ya puedes entrar a FotoIA Pro y comenzar a generar imágenes.</p>
        <p><a href="https://www.fotoia.pro">Ir a FotoIA Pro</a></p>
      `,
    }),
  });
}
