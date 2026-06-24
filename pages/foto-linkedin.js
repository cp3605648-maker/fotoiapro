import Head from "next/head";
import Link from "next/link";

export default function FotoLinkedIn() {
  const faqs = [
    {
      q: "¿FotoIA Pro cambia mi rostro?",
      a: "No. La idea es conservar tu identidad y mejorar la foto con fondo, iluminación, ropa y estilo profesional.",
    },
    {
      q: "¿Puedo usar la foto en LinkedIn?",
      a: "Sí. Puedes crear una imagen profesional ideal para perfil de LinkedIn, CV, marca personal o búsqueda de empleo.",
    },
    {
      q: "¿Necesito saber editar fotos?",
      a: "No. Solo subes tu imagen, describes el resultado que quieres y FotoIA Pro genera la versión mejorada con IA.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>Foto para LinkedIn con IA | FotoIA Pro</title>
        <meta
          name="description"
          content="Crea una foto profesional para LinkedIn con inteligencia artificial. Mejora fondo, iluminación, ropa y calidad sin perder tu identidad."
        />
        <link rel="canonical" href="https://www.fotoia.pro/foto-linkedin" />
        <meta property="og:title" content="Foto para LinkedIn con IA | FotoIA Pro" />
        <meta
          property="og:description"
          content="Convierte tu foto en una imagen profesional para LinkedIn usando inteligencia artificial."
        />
        <meta property="og:url" content="https://www.fotoia.pro/foto-linkedin" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="seoPage">
        <section className="seoHero">
          <p className="seoBadge">Foto profesional con IA</p>
          <h1>Foto Profesional para LinkedIn con Inteligencia Artificial</h1>
          <p>
            Convierte una foto normal en una imagen profesional para LinkedIn,
            CV, entrevistas, marca personal o perfil corporativo.
          </p>
          <Link href="/" className="seoButton">
            Crear mi foto para LinkedIn
          </Link>
        </section>

        <section className="seoGrid">
          <div>
            <h2>¿Por qué mejorar tu foto de LinkedIn?</h2>
            <p>
              Tu foto de perfil es una de las primeras cosas que ven reclutadores,
              clientes y contactos profesionales. Una imagen clara, cuidada y
              profesional puede ayudarte a causar una mejor primera impresión.
            </p>
          </div>

          <div>
            <h2>Qué puedes crear</h2>
            <ul>
              <li>Foto profesional con fondo corporativo</li>
              <li>Imagen para CV o currículum</li>
              <li>Retrato ejecutivo</li>
              <li>Foto con ropa formal</li>
              <li>Mejor iluminación y nitidez</li>
              <li>Perfil profesional para redes</li>
            </ul>
          </div>
        </section>

        <section className="seoSteps">
          <h2>Cómo funciona</h2>
          <div className="steps">
            <article>
              <strong>1</strong>
              <h3>Sube tu foto</h3>
              <p>Elige una imagen donde tu rostro se vea claro.</p>
            </article>
            <article>
              <strong>2</strong>
              <h3>Describe el estilo</h3>
              <p>Pide fondo ejecutivo, ropa formal o iluminación profesional.</p>
            </article>
            <article>
              <strong>3</strong>
              <h3>Descarga el resultado</h3>
              <p>Obtén una imagen lista para usar en LinkedIn.</p>
            </article>
          </div>
        </section>

        <section className="seoPrompt">
          <h2>Ejemplo de prompt</h2>
          <p>
            “Convierte esta foto en una imagen profesional para LinkedIn,
            conserva mi rostro, mejora la iluminación, agrega fondo corporativo
            elegante y ropa formal.”
          </p>
        </section>

        <section className="seoFaq">
          <h2>Preguntas frecuentes</h2>
          {faqs.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </section>

        <section className="seoCta">
          <h2>Crea tu foto profesional para LinkedIn hoy</h2>
          <p>
            Prueba FotoIA Pro y transforma tu imagen en segundos.
          </p>
          <Link href="/" className="seoButton">
            Probar FotoIA Pro
          </Link>
        </section>
      </main>

      <style jsx>{`
        .seoPage {
          min-height: 100vh;
          background: #070812;
          color: white;
          padding: 48px 20px;
        }

        .seoHero,
        .seoGrid,
        .seoSteps,
        .seoPrompt,
        .seoFaq,
        .seoCta {
          max-width: 1100px;
          margin: 0 auto 56px;
        }

        .seoHero {
          text-align: center;
          padding: 70px 20px;
        }

        .seoBadge {
          display: inline-block;
          padding: 8px 14px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 999px;
          color: #d7b8ff;
          margin-bottom: 18px;
        }

        h1 {
          font-size: clamp(34px, 6vw, 64px);
          line-height: 1.05;
          margin: 0 auto 22px;
          max-width: 900px;
        }

        h2 {
          font-size: clamp(26px, 4vw, 40px);
          margin-bottom: 18px;
        }

        p, li {
          color: rgba(255,255,255,.78);
          font-size: 18px;
          line-height: 1.7;
        }

        .seoButton {
          display: inline-block;
          margin-top: 24px;
          padding: 16px 24px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white;
          text-decoration: none;
          font-weight: 800;
        }

        .seoGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .seoGrid > div,
        .seoPrompt,
        .seoFaq article,
        .seoCta,
        .steps article {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 24px;
          padding: 28px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .steps strong {
          display: inline-flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(124,58,237,.25);
          margin-bottom: 12px;
        }

        .seoFaq article {
          margin-bottom: 16px;
        }

        .seoCta {
          text-align: center;
        }

        @media (max-width: 800px) {
          .seoGrid,
          .steps {
            grid-template-columns: 1fr;
          }

          .seoPage {
            padding: 24px 14px;
          }
        }
      `}</style>
    </>
  );
}
