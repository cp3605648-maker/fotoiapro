export default function HeroShowcase() {
  return (
    <div className="heroShowcase">
      <div className="showcaseTop">
        <span>🔥 1 crédito gratis</span>
        <h3>Prueba tu primera transformación</h3>
      </div>

      <div className="beforeAfterHero">
        <div className="heroMiniCard">
          <span>Antes</span>
          <div className="miniPhoto">📷</div>
        </div>

        <div className="heroArrow">→</div>

        <div className="heroMiniCard after">
          <span>Después</span>
          <div className="miniPhoto glow">✨</div>
        </div>
      </div>

      <div className="heroPrompt">
        “Hazme una foto LinkedIn profesional, con fondo ejecutivo y sin cambiar mi rostro.”
      </div>

      <div className="heroChecks">
        <span>✅ Mantiene tu identidad</span>
        <span>✅ Optimizada para redes</span>
        <span>✅ Descarga inmediata</span>
      </div>

      <style jsx>{`
        .heroShowcase {
          padding: 28px;
          border-radius: 32px;
          background:
            radial-gradient(circle at top, rgba(34,211,238,0.22), transparent 45%),
            linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04));
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 30px 90px rgba(0,0,0,0.38);
        }

        .showcaseTop {
          text-align: center;
          margin-bottom: 20px;
        }

        .showcaseTop span {
          display: inline-block;
          margin-bottom: 10px;
          padding: 7px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          color: white;
          font-weight: 900;
          font-size: 13px;
        }

        .showcaseTop h3 {
          margin: 0;
          color: white;
          font-size: 24px;
        }

        .beforeAfterHero {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
        }

        .heroMiniCard {
          height: 230px;
          border-radius: 24px;
          background: rgba(0,0,0,0.28);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .heroMiniCard span {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(0,0,0,0.45);
          color: white;
          font-size: 12px;
          font-weight: 900;
        }

        .after {
          background:
            radial-gradient(circle at center, rgba(34,211,238,0.25), transparent 60%),
            rgba(124,58,237,0.16);
        }

        .miniPhoto {
          width: 86px;
          height: 86px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
          background: rgba(255,255,255,0.08);
        }

        .glow {
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          box-shadow: 0 0 55px rgba(34,211,238,0.5);
        }

        .heroArrow {
          color: #22d3ee;
          font-size: 34px;
          font-weight: 900;
        }

        .heroPrompt {
          margin-top: 20px;
          padding: 16px;
          border-radius: 18px;
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.88);
          line-height: 1.45;
          font-weight: 700;
        }

        .heroChecks {
          display: grid;
          gap: 8px;
          margin-top: 16px;
          color: white;
          font-weight: 800;
        }

        @media (max-width: 700px) {
          .beforeAfterHero {
            grid-template-columns: 1fr;
          }

          .heroArrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}
