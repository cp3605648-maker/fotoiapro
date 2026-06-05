const styles = [
  { icon: "💼", title: "LinkedIn Premium", desc: "Foto profesional para perfil y CV" },
  { icon: "👔", title: "Business Executive", desc: "Imagen corporativa elegante" },
  { icon: "🏋️", title: "Fitness", desc: "Fotos deportivas y de alto impacto" },
  { icon: "📸", title: "Influencer", desc: "Contenido atractivo para redes" },
  { icon: "🌴", title: "Luxury Travel", desc: "Viajes, playa y escenarios premium" },
  { icon: "💍", title: "Wedding", desc: "Estilo romántico y editorial" },
  { icon: "🕶️", title: "Fashion Editorial", desc: "Moda, revista y glamour" },
  { icon: "🏡", title: "Real Estate", desc: "Visuales para propiedades y negocios" },
  { icon: "▶️", title: "YouTube Creator", desc: "Miniaturas y presencia visual" },
  { icon: "🛒", title: "Producto Ecommerce", desc: "Fotos para vender productos" },
];

export default function PremiumStylesGrid() {
  return (
    <section className="premiumStyles">
      <div className="premiumHeader">
        <span>🔥 Estilos premium</span>
        <h2>Crea fotos listas para redes, negocios y ventas</h2>
        <p>Elige una idea, escribe lo que quieres y deja que la IA transforme tu imagen.</p>
      </div>

      <div className="stylesGrid">
        {styles.map((item) => (
          <div className="styleCard" key={item.title}>
            <div className="styleIcon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .premiumStyles {
          max-width: 1150px;
          margin: 70px auto 30px;
          padding: 10px 18px;
          text-align: center;
        }

        .premiumHeader span {
          display: inline-block;
          margin-bottom: 12px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(124,58,237,0.18);
          border: 1px solid rgba(168,85,247,0.35);
          color: #c4b5fd;
          font-weight: 900;
        }

        .premiumHeader h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 48px);
          color: white;
          letter-spacing: -1px;
        }

        .premiumHeader p {
          margin: 14px auto 30px;
          max-width: 720px;
          color: rgba(255,255,255,0.72);
          font-size: 17px;
        }

        .stylesGrid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
        }

        .styleCard {
          padding: 24px 18px;
          border-radius: 24px;
          background:
            radial-gradient(circle at top, rgba(34,211,238,0.12), transparent 55%),
            rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.11);
          box-shadow: 0 18px 45px rgba(0,0,0,0.25);
          transition: transform .25s ease, border-color .25s ease;
        }

        .styleCard:hover {
          transform: translateY(-5px);
          border-color: rgba(34,211,238,0.45);
        }

        .styleIcon {
          width: 48px;
          height: 48px;
          margin: 0 auto 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          font-size: 25px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          box-shadow: 0 12px 26px rgba(124,58,237,0.35);
        }

        .styleCard h3 {
          margin: 0 0 8px;
          color: white;
          font-size: 17px;
        }

        .styleCard p {
          margin: 0;
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          line-height: 1.45;
        }

        @media (max-width: 1000px) {
          .stylesGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .stylesGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
