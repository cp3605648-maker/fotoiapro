export default function TrustBanner() {
  return (
    <section className="trustBanner">
      <div className="stars">⭐⭐⭐⭐⭐</div>
      <h2>Transforma tus fotos para uso profesional y redes sociales</h2>
      <p>FotoIA.pro te ayuda a crear imágenes listas para destacar en minutos.</p>

      <div className="trustItems">
        <span>✓ LinkedIn</span>
        <span>✓ Redes sociales</span>
        <span>✓ Negocios</span>
        <span>✓ Marketing</span>
        <span>✓ Contenido IA</span>
        <span>✓ Fotos profesionales</span>
      </div>

      <style jsx>{`
        .trustBanner {
          max-width: 1100px;
          margin: 70px auto 30px;
          padding: 34px 28px;
          border-radius: 28px;
          text-align: center;
          background: radial-gradient(circle at top, rgba(124,58,237,0.22), transparent 50%),
            rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 70px rgba(0,0,0,0.35);
        }

        .stars {
          font-size: 26px;
          margin-bottom: 12px;
        }

        h2 {
          font-size: clamp(28px, 4vw, 46px);
          margin: 0;
          color: white;
          letter-spacing: -1px;
        }

        p {
          margin: 12px 0 24px;
          color: rgba(255,255,255,0.7);
          font-size: 17px;
        }

        .trustItems {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .trustItems span {
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-weight: 700;
        }
      `}</style>
    </section>
  );
}
