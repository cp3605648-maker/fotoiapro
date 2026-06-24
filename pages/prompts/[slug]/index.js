import Head from "next/head";
import Link from "next/link";
import { promptLibrary } from "../../../data/promptLibrary";

export default function PromptPage({ page }) {
  return (
    <>
      <Head>
        <title>{page.title} | FotoIA Pro</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={page.canonical} />
        <meta property="og:title" content={`${page.title} | FotoIA Pro`} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={page.canonical} />
      </Head>

      <main className="promptPage">
        <section className="hero">
          <p>{page.category}</p>
          <h1>{page.title}</h1>
          <span>{page.description}</span>
        </section>

        <section className="list">
          {page.prompts.map((prompt) => (
            <article key={prompt}>
              <p>“{prompt}”</p>
            </article>
          ))}
        </section>

        <section className="cta">
          <h2>Usa estos prompts en FotoIA Pro</h2>
          <Link href={page.ctaUrl}>Crear imagen con IA</Link>
        </section>
      </main>

      <style jsx>{`
        .promptPage {
          min-height: 100vh;
          background: #070812;
          color: white;
          padding: 48px 20px;
        }

        .hero, .list, .cta {
          max-width: 900px;
          margin: 0 auto 48px;
        }

        h1 {
          font-size: clamp(34px, 6vw, 58px);
        }

        span, p {
          color: rgba(255,255,255,.78);
          font-size: 18px;
          line-height: 1.7;
        }

        article, .cta {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 22px;
          padding: 24px;
          margin-bottom: 16px;
        }

        a {
          display: inline-block;
          margin-top: 16px;
          padding: 14px 22px;
          border-radius: 14px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: white;
          text-decoration: none;
          font-weight: 800;
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: promptLibrary.map((page) => ({
      params: { slug: page.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = promptLibrary.find((item) => item.slug === params.slug);

  return {
    props: { page },
  };
}
