export default function WhatCanYouAskBanner() {
  const examples = [
    "Cambiar fondos y lugares",
    "Agregar lentes, autos o accesorios",
    "Cambiar ropa o estilo",
    "Crear foto LinkedIn profesional",
    "Crear imagen para Shopify",
    "Miniatura para YouTube",
    "Instagram, TikTok o WhatsApp",
    "Mejorar brillo, contraste y nitidez",
    "Mantener tu identidad y rostro"
  ];

  return (
    <section className="askBanner">
      <div className="badge">✨ Descripción libre</div>
      <h2>Escribe lo que quieres y FotoIA.pro lo interpreta</h2>
      <p>
        No necesitas saber prompts técnicos. Describe tu idea como si hablaras con un editor profesional.
      </p>

      <div className="askGrid">
        {examples.map((item) => (
          <div className="askItem" key={item}>✓ {item}</div>
        ))}
      </div>

      <div className="exampleBox">
        Ejemplo: “Hazme una foto para Instagram en una playa, con lentes negros, más brillo y contraste, sin cambiar mi rostro.”
      </div>

      <style jsx>{`
        .askBanner {
          max-width: 1150px;
          margin: 60px auto 30px;
          padding: 34px 26px;
          border-radius: 30px;
          text-align: center;
          background:
            radial-gradient(circle at top, rgba(168,85,247,0.22), transparent 45%),
            rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 70px rgba(0,0,0,0.35);
        }

        .badge {
          display: inline-block;
          margin-bottom: 12px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(168,85,247,0.16);
          border: 1px solid rgba(168,85,247,0.35);
          color: #ddd6fe;
          font-weight: 900;
        }

        h2 {
          margin: 0;
          color: white;
          font-size: clamp(30px, 4vw, 48px);
          letter-spacing: -1px;
        }

        p {
          max-width: 760px;
          margin: 14px auto 24px;
          color: rgba(255,255,255,0.72);
          font-size: 17px;
          line-height: 1.6;
        }

        .askGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 24px;
        }

        .askItem {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-weight: 800;
        }

        .exampleBox {
          margin: 26px auto 0;
          max-width: 900px;
          padding: 18px 20px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.18));
          color: white;
          font-weight: 800;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .askGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .askGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
