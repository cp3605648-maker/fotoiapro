export default function PromptHelperChips({ setDescription }) {
  const chips = [
    {
      label: "💼 LinkedIn",
      prompt: "Hazme una foto profesional para LinkedIn con iluminación corporativa, fondo ejecutivo y apariencia premium, manteniendo mi rostro idéntico."
    },
    {
      label: "📸 Instagram",
      prompt: "Hazme una foto para Instagram con estilo premium, colores atractivos, buena iluminación y composición profesional, manteniendo mi rostro idéntico."
    },
    {
      label: "🎵 TikTok",
      prompt: "Hazme una imagen vertical para TikTok, llamativa, moderna, con buena iluminación y estilo viral, manteniendo mi rostro idéntico."
    },
    {
      label: "🛍 Shopify",
      prompt: "Hazme una foto para Shopify con fondo limpio, buena iluminación, contraste profesional y apariencia comercial premium."
    },
    {
      label: "▶️ YouTube",
      prompt: "Hazme una miniatura para YouTube con estilo llamativo, alto contraste, espacio para texto y rostro bien visible, manteniendo mi identidad."
    },
    {
      label: "🌴 Playa",
      prompt: "Ponme en una playa cerca de la orilla del mar, con luz natural, estilo premium y rostro idéntico."
    },
    {
      label: "🏙 Dubái",
      prompt: "Ponme en Dubái con fondo de lujo, iluminación cinematográfica, estilo premium y manteniendo mi rostro idéntico."
    },
    {
      label: "🚗 Auto deportivo",
      prompt: "Agrega un auto deportivo de lujo en la escena, con iluminación realista, perspectiva natural y sin cambiar mi rostro."
    },
    {
      label: "🎬 Cinemático",
      prompt: "Convierte mi foto en una imagen cinematográfica con iluminación dramática, contraste profesional y rostro idéntico."
    },
    {
      label: "✨ Luxury",
      prompt: "Dame un estilo luxury branding con fondo premium, iluminación elegante, apariencia de alto valor y rostro idéntico."
    }
  ];

  return (
    <div className="helperWrap">
      <div className="helperTitle">Ideas rápidas para probar:</div>
      <div className="chipGrid">
        {chips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => setDescription(chip.prompt)}
            className="chip"
          >
            {chip.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        .helperWrap {
          margin: 14px 0 18px;
        }

        .helperTitle {
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .chipGrid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.07);
          color: white;
          padding: 9px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .chip:hover {
          transform: translateY(-2px);
          border-color: rgba(34,211,238,0.55);
          background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.25));
        }
      `}</style>
    </div>
  );
}
