import Head from "next/head";
import Link from "next/link";
import { blogPosts } from "../../../data/blogPosts";

export default function BlogPost({ post }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "FotoIA Pro",
    },
    publisher: {
      "@type": "Organization",
      name: "FotoIA Pro",
    },
    mainEntityOfPage: post.canonical,
  };

  return (
    <>
      <Head>
        <title>{post.title} | FotoIA Pro</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={post.canonical} />
        <meta property="og:title" content={`${post.title} | FotoIA Pro`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={post.canonical} />
        <meta property="og:type" content="article" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <main className="blogPage">
        <article className="blogArticle">
          <p className="badge">{post.category}</p>
          <h1>{post.h1}</h1>
          <p className="intro">{post.intro}</p>

          {post.sections.map((section) => (
            <section key={section.h2}>
              <h2>{section.h2}</h2>
              <p>{section.text}</p>
            </section>
          ))}

          <section className="promptBox">
            <h2>Prompts recomendados</h2>
            {post.prompts.map((prompt) => (
              <p key={prompt}>“{prompt}”</p>
            ))}
          </section>

          <section className="cta">
            <h2>Prueba FotoIA Pro</h2>
            <p>Crea imágenes profesionales con inteligencia artificial en segundos.</p>
            <Link href={post.ctaUrl}>{post.ctaText}</Link>
          </section>
        </article>
      </main>

      <style jsx>{`
        .blogPage {
          min-height: 100vh;
          background: #070812;
          color: white;
          padding: 48px 20px;
        }

        .blogArticle {
          max-width: 850px;
          margin: 0 auto;
        }

        .badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(124,58,237,.22);
          color: #d7b8ff;
        }

        h1 {
          font-size: clamp(34px, 6vw, 58px);
          line-height: 1.08;
        }

        h2 {
          margin-top: 42px;
          font-size: 30px;
        }

        p {
          color: rgba(255,255,255,.78);
          font-size: 18px;
          line-height: 1.8;
        }

        .intro {
          font-size: 21px;
        }

        .promptBox,
        .cta {
          margin-top: 42px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 24px;
          padding: 28px;
        }

        .cta {
          text-align: center;
        }

        .cta a {
          display: inline-block;
          margin-top: 16px;
          padding: 15px 22px;
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
    paths: blogPosts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  return {
    props: {
      post,
    },
  };
}
