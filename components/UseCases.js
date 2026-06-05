import { useState } from "react";

const useCases = [
  {
    title: "Instagram",
    icon: "📸",
    size: "Feed 4:5 — 1080x1350 / Stories y Reels 9:16 — 1080x1920",
    canDo: [
      "Fotos para feed, stories y reels",
      "Mejorar brillo, contraste, color y nitidez",
      "Agregar fondos, accesorios, lugares y estilo influencer",
      "Optimizar encuadre para móvil"
    ],
    editable: ["fondo", "ropa", "lentes", "pose", "iluminación", "colores", "estilo premium"],
    prompt: "Hazme una foto para Instagram en una playa, con lentes negros, más brillo y contraste, manteniendo mi rostro idéntico."
  },
  {
    title: "LinkedIn",
    icon: "💼",
    size: "Perfil 1:1 — recomendado 1024x1024 o 2048x2048",
    canDo: [
      "Foto profesional para perfil",
      "Fondo corporativo u oficina moderna",
      "Ropa ejecutiva o formal",
      "Iluminación limpia y apariencia confiable"
    ],
    editable: ["fondo ejecutivo", "traje", "postura", "luz profesional", "encuadre de rostro"],
    prompt: "Hazme una foto profesional para LinkedIn con traje elegante, fondo de oficina moderna e iluminación corporativa, sin cambiar mi rostro."
  },
  {
    title: "Shopify",
    icon: "🛒",
    size: "Producto 1:1 — ideal 2048x2048",
    canDo: [
      "Foto de producto para tienda online",
      "Fondo blanco, gris o lifestyle premium",
      "Mejorar nitidez, color real y sombras",
      "Hacer el producto más vendible"
    ],
    editable: ["fondo limpio", "sombras", "contraste", "reflejo suave", "nitidez", "colores reales"],
    prompt: "Hazme una foto para Shopify con fondo blanco premium, producto centrado, buena iluminación, más nitidez y contraste comercial."
  },
  {
    title: "YouTube",
    icon: "🎬",
    size: "Miniatura 16:9 — 1280x720 o 1920x1080",
    canDo: [
      "Miniaturas llamativas",
      "Rostro grande y bien iluminado",
      "Espacio libre para texto",
      "Contraste alto para más clics"
    ],
    editable: ["fondo", "expresión si se pide", "contraste", "iluminación", "espacio para texto", "estilo gaming o negocio"],
    prompt: "Hazme una miniatura para YouTube con rostro visible, alto contraste, fondo llamativo y espacio libre para texto, manteniendo mi identidad."
  },
  {
    title: "TikTok",
    icon: "🎵",
    size: "Vertical 9:16 — 1080x1920",
    canDo: [
      "Imagen vertical para contenido corto",
      "Estilo moderno y llamativo",
      "Colores vivos y buena iluminación",
      "Encuadre pensado para celular"
    ],
    editable: ["fondo", "ropa", "pose", "iluminación", "color vibrante", "estilo viral"],
    prompt: "Hazme una imagen vertical para TikTok con estilo moderno, colores llamativos, buena iluminación y rostro idéntico."
  },
  {
    title: "WhatsApp",
    icon: "💬",
    size: "Perfil 1:1 — 1080x1080 / Estado 9:16 — 1080x1920",
    canDo: [
      "Foto de perfil clara",
      "Imagen para estado",
      "Catálogo para WhatsApp Business",
      "Encuadre seguro para recorte circular"
    ],
    editable: ["fondo", "luz", "nitidez", "perfil profesional", "catálogo", "producto"],
    prompt: "Hazme una foto cuadrada para WhatsApp, con fondo profesional, buena luz, rostro centrado y sin cambiar mi identidad."
  },
  {
    title: "Luxury",
    icon: "💎",
    size: "Ideal 4:5 — 1080x1350 o 1:1 — 1024x1024",
    canDo: [
      "Estilo premium de alto valor",
      "Fondos de lujo: hotel, yate, auto, ciudad",
      "Iluminación cinematográfica",
      "Apariencia elegante para marca personal"
    ],
    editable: ["autos de lujo", "yate", "hotel", "traje", "reloj", "fondo premium", "brillo", "contraste"],
    prompt: "Dame un estilo luxury branding con traje elegante, fondo premium, iluminación cinematográfica y rostro idéntico."
  },
  {
    title: "Playa",
    icon: "🌴",
    size: "Instagram 4:5 o vertical 9:16",
    canDo: [
      "Cambiar fondo a playa",
      "Agregar mar, arena, palmeras u orilla",
      "Luz natural o atardecer",
      "Estilo vacaciones premium"
    ],
    editable: ["mar", "arena", "palmeras", "lentes", "sombrero", "ropa de verano", "atardecer"],
    prompt: "Ponme en una playa cerca de la orilla del mar, con luz natural, lentes oscuros y estilo premium, sin cambiar mi rostro."
  },
  {
    title: "Dubái",
    icon: "🏙",
    size: "4:5 para redes o 16:9 para banner",
    canDo: [
      "Fondos de ciudad de lujo",
      "Skyline, autos premium o hoteles",
      "Estética millonaria y aspiracional",
      "Iluminación nocturna o dorada"
    ],
    editable: ["skyline", "Lamborghini", "traje", "hotel", "luces nocturnas", "fondo de lujo"],
    prompt: "Ponme en Dubái de noche con un Lamborghini negro, traje elegante, luces de ciudad y rostro idéntico."
  },
  {
    title: "Autos",
    icon: "🚗",
    size: "4:5 o 16:9 según red social",
    canDo: [
      "Agregar autos deportivos",
      "Escenas de lujo o carretera",
      "Perspectiva realista",
      "Sombras e iluminación coherentes"
    ],
    editable: ["Lamborghini", "Ferrari", "BMW", "Mercedes", "carretera", "ciudad", "luces"],
    prompt: "Agrega un auto deportivo de lujo junto a mí, con perspectiva realista, sombras naturales y sin cambiar mi rostro."
  },
  {
    title: "Corporativo",
    icon: "👔",
    size: "Perfil 1:1 o post 4:5",
    canDo: [
      "Fotos ejecutivas",
      "Perfil profesional para negocio",
      "Fondo de oficina o sala de juntas",
      "Ropa formal y presencia confiable"
    ],
    editable: ["traje", "oficina", "sala de juntas", "laptop", "postura ejecutiva", "luz corporativa"],
    prompt: "Hazme una foto corporativa con traje, fondo de oficina moderna, luz profesional y rostro idéntico."
  },
  {
    title: "Anime",
    icon: "🎨",
    size: "Avatar 1:1 o retrato 4:5",
    canDo: [
      "Avatar estilo anime",
      "Retrato creativo",
      "Fondo japonés o futurista",
      "Mantener rasgos principales de identidad"
    ],
    editable: ["estilo anime", "fondo", "ropa", "colores", "personaje", "iluminación"],
    prompt: "Convierte mi foto en estilo anime de alta calidad, manteniendo mis rasgos principales, peinado y personalidad."
  }
];

export default function UseCases() {
  const [open, setOpen] = useState(null);

  return (
    <section className="useCases">
      <div className="useHeader">
        <span>✨ Ideas listas para usar</span>
        <h2>¿Qué puedes crear?</h2>
        <p>Haz clic en una categoría y descubre qué puede editar FotoIA.pro, tamaños recomendados y cómo pedirlo.</p>
      </div>

      <div className="useGrid">
        {useCases.map((item, index) => (
          <div key={item.title} className={`useCard ${open === index ? "active" : ""}`}>
            <button type="button" onClick={() => setOpen(open === index ? null : index)} className="useTop">
              <span className="icon">{item.icon}</span>
              <strong>{item.title}</strong>
              <em>{open === index ? "−" : "+"}</em>
            </button>

            {open === index && (
              <div className="useContent">
                <div className="infoBlock">
                  <b>📐 Tamaño ideal</b>
                  <p>{item.size}</p>
                </div>

                <div className="infoBlock">
                  <b>✅ Qué puede hacer</b>
                  <ul>
                    {item.canDo.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>

                <div className="infoBlock">
                  <b>🛠 Puede editar/agregar</b>
                  <div className="tags">
                    {item.editable.map((x) => <span key={x}>{x}</span>)}
                  </div>
                </div>

                <div className="promptBoxExample">
                  <b>✍️ Ejemplo para descripción libre</b>
                  <p>{item.prompt}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .useCases {
          max-width: 1180px;
          margin: 80px auto;
          padding: 0 18px;
        }

        .useHeader {
          text-align: center;
          margin-bottom: 32px;
        }

        .useHeader span {
          display: inline-block;
          margin-bottom: 10px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(34,211,238,0.12);
          border: 1px solid rgba(34,211,238,0.3);
          color: #67e8f9;
          font-weight: 900;
        }

        .useHeader h2 {
          margin: 0;
          color: white;
          font-size: clamp(34px, 5vw, 54px);
        }

        .useHeader p {
          max-width: 780px;
          margin: 12px auto 0;
          color: rgba(255,255,255,0.72);
          font-size: 17px;
        }

        .useGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .useCard {
          border-radius: 24px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.11);
          overflow: hidden;
          box-shadow: 0 18px 48px rgba(0,0,0,0.22);
        }

        .useCard.active {
          border-color: rgba(34,211,238,0.45);
          background:
            radial-gradient(circle at top, rgba(34,211,238,0.12), transparent 55%),
            rgba(255,255,255,0.065);
        }

        .useTop {
          width: 100%;
          border: 0;
          background: transparent;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          cursor: pointer;
          text-align: left;
        }

        .icon {
          font-size: 26px;
        }

        .useTop strong {
          flex: 1;
          font-size: 18px;
        }

        .useTop em {
          font-style: normal;
          font-size: 24px;
          color: #22d3ee;
          font-weight: 900;
        }

        .useContent {
          padding: 0 20px 22px;
          color: rgba(255,255,255,0.82);
        }

        .infoBlock {
          margin-top: 16px;
        }

        .infoBlock b,
        .promptBoxExample b {
          color: white;
          display: block;
          margin-bottom: 8px;
        }

        .infoBlock p,
        .promptBoxExample p {
          margin: 0;
          line-height: 1.5;
          color: rgba(255,255,255,0.72);
        }

        ul {
          margin: 0;
          padding-left: 18px;
          line-height: 1.6;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tags span {
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 13px;
          color: white;
        }

        .promptBoxExample {
          margin-top: 18px;
          padding: 14px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.16));
          border: 1px solid rgba(255,255,255,0.12);
        }

        @media (max-width: 980px) {
          .useGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .useGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
