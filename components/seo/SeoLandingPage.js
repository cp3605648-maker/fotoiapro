import Head from "next/head";
import Link from "next/link";
import SeoRelatedPages from "./SeoRelatedPages";

export default function SeoLandingPage({
  title,
  description,
  canonical,
  h1,
  subtitle,
  badge = "Herramienta con IA",
  cta = "Probar FotoIA Pro",
  keyword,
  benefits = [],
  useCases = [],
  prompts = [],
  faqs = [],
  relatedPages = [],
}) {
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
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.fotoia.pro/icon.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.fotoia.pro/icon.png" />

        {faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
      </Head>

      <main className="seoPage">
        <section className="seoHero">
          <p className="seoBadge">{badge}</p>
          <h1>{h1}</h1>
          <p>{subtitle}</p>
          <Link href="/" className="seoButton">
            {cta}
          </Link>
        </section>

        {benefits.length > 0 && (
          <section className="seoSection">
            <h2>Beneficios principales</h2>
            <div className="seoCards">
              {benefits.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {useCases.length > 0 && (
          <section className="seoSection">
            <h2>Qué puedes crear</h2>
            <div className="seoCards">
              {useCases.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="seoSection">
          <h2>Cómo funciona</h2>
          <div className="seoSteps">
            <article>
              <strong>1</strong>
              <h3>Sube tu foto</h3>
              <p>Elige una imagen donde el rostro o producto se vea claro.</p>
            </article>
            <article>
              <strong>2</strong>
              <h3>Describe tu idea</h3>
              <p>Escribe el estilo, fondo, ropa o resultado que quieres.</p>
            </article>
            <article>
              <strong>3</strong>
              <h3>Descarga el resultado</h3>
              <p>Obtén una imagen mejorada con inteligencia artificial.</p>
            </article>
          </div>
        </section>

        {prompts.length > 0 && (
          <section className="seoSection">
            <h2>Prompts recomendados</h2>
            <div className="seoPromptList">
              {prompts.map((prompt) => (
                <p key={prompt}>“{prompt}”</p>
              ))}
            </div>
          </section>
        )}

        <section className="seoSection seoText">
          <h2>{keyword ? `Crear ${keyword} con inteligencia artificial` : "Editar fotos con inteligencia artificial"}</h2>
          <p>
            FotoIA Pro permite transformar imágenes de forma rápida, sencilla y
            profesional. Puedes mejorar fotografías para perfiles, currículum,
            redes sociales, ecommerce, productos, documentos y contenido digital.
            La herramienta está pensada para personas que quieren resultados de
            calidad sin usar programas complejos de edición.
          </p>
          <p>
            Con ayuda de inteligencia artificial puedes cambiar fondos, mejorar
            iluminación, ajustar estilo, generar una apariencia más profesional y
            preparar imágenes listas para usarse en plataformas digitales.
          </p>
        </section>

        {faqs.length > 0 && (
          <section className="seoSection seoFaq">
            <h2>Preguntas frecuentes</h2>
            {faqs.map((item) => (
              <article key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </section>
        )}

        <SeoRelatedPages pages={relatedPages} />

        <section className="seoCta">
          <h2>Empieza a crear imágenes profesionales con FotoIA Pro</h2>
          <p>Sube una foto, describe lo que quieres y deja que la IA haga el resto.</p>
          <Link href="/" className="seoButton">
            {cta}
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
        .seoSection,
        .seoCta {
          max-width: 1100px;
          margin: 0 auto 56px;
        }

        .seoHero {
          text-align: center;
          padding: 72px 20px;
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

        h3 {
          margin-top: 0;
        }

        p {
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

        .seoCards,
        .seoSteps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .seoCards article,
        .seoSteps article,
        .seoPromptList,
        .seoText,
        .seoFaq article,
        .seoCta {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 24px;
          padding: 28px;
        }

        .seoSteps strong {
          display: inline-flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(124,58,237,.25);
          margin-bottom: 12px;
        }

        .seoPromptList p {
          border-bottom: 1px solid rgba(255,255,255,.1);
          padding-bottom: 14px;
        }

        .seoFaq article {
          margin-bottom: 16px;
        }

        .seoCta {
          text-align: center;
        }

        @media (max-width: 800px) {
          .seoCards,
          .seoSteps {
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
