export default function SocialReadyBanner() {
  const platforms = [
    "Instagram",
    "TikTok",
    "Facebook",
    "WhatsApp",
    "Messenger",
    "YouTube",
    "LinkedIn",
    "Pinterest",
    "X / Twitter",
    "Shopify"
  ];

  return (
    <section className="socialReady">
      <div className="badge">📐 Tamaño inteligente</div>
      <h2>Imágenes optimizadas para cada plataforma</h2>
      <p>
        FotoIA.pro entiende si necesitas una imagen para redes, tienda online,
        perfil profesional, portada, historia, reel o miniatura.
      </p>

      <div className="platformGrid">
        {platforms.map((item) => (
          <span key={item}>✓ {item}</span>
        ))}
      </div>

      <div className="note">
        La IA ajusta encuadre, proporción, iluminación, contraste y composición según el uso.
      </div>

      <style jsx>{`
        .socialReady {
          max-width: 1150px;
          margin: 60px auto 30px;
          padding: 34px 26px;
          border-radius: 30px;
          text-align: center;
          background:
            radial-gradient(circle at top left, rgba(6,182,212,0.22), transparent 45%),
            radial-gradient(circle at top right, rgba(124,58,237,0.22), transparent 45%),
            rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 70px rgba(0,0,0,0.35);
        }

        .badge {
          display: inline-block;
          margin-bottom: 12px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(34,211,238,0.14);
          border: 1px solid rgba(34,211,238,0.35);
          color: #67e8f9;
          font-weight: 900;
        }

        h2 {
          margin: 0;
          color: white;
          font-size: clamp(30px, 4vw, 48px);
          letter-spacing: -1px;
        }

        p {
          max-width: 780px;
          margin: 14px auto 24px;
          color: rgba(255,255,255,0.72);
          font-size: 17px;
          line-height: 1.6;
        }

        .platformGrid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          margin-top: 24px;
        }

        .platformGrid span {
          padding: 12px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-weight: 800;
          font-size: 14px;
        }

        .note {
          margin-top: 24px;
          color: #22d3ee;
          font-weight: 900;
        }

        @media (max-width: 900px) {
          .platformGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 520px) {
          .platformGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
