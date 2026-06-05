export default function UseCases() {
  const items = [
    "📸 Instagram",
    "💼 LinkedIn",
    "🛒 Shopify",
    "🎬 YouTube",
    "🎵 TikTok",
    "💎 Luxury",
    "🌴 Playa",
    "🏙 Dubái",
    "🚗 Autos",
    "🏠 Airbnb",
    "👔 Corporativo",
    "🎨 Anime"
  ];

  return (
    <section className="useCases">
      <h2>¿Qué puedes crear?</h2>

      <div className="useGrid">
        {items.map(item => (
          <div key={item} className="useCard">
            {item}
          </div>
        ))}
      </div>

      <style jsx>{`
        .useCases{
          margin:80px 0;
          text-align:center;
        }

        .useCases h2{
          color:white;
          font-size:42px;
          margin-bottom:30px;
        }

        .useGrid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
          gap:16px;
        }

        .useCard{
          padding:24px;
          border-radius:20px;
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.1);
          color:white;
          font-weight:800;
          transition:.25s;
        }

        .useCard:hover{
          transform:translateY(-4px);
          border-color:#22d3ee;
        }
      `}</style>
    </section>
  );
}
