import Link from "next/link";

export default function SeoRelatedPages({ pages = [] }) {
  if (!pages.length) return null;

  return (
    <section className="related">
      <h2>También te puede interesar</h2>

      <div className="grid">
        {pages.map((page) => (
          <Link href={`/${page.slug}`} key={page.slug} className="card">
            <strong>{page.h1 || page.title}</strong>
            <span>{page.description}</span>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .related {
          max-width: 1100px;
          margin: 0 auto 56px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .card {
          display: block;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 20px;
          padding: 20px;
          text-decoration: none;
          color: white;
        }

        .card span {
          display: block;
          margin-top: 10px;
          color: rgba(255,255,255,.7);
          font-size: 15px;
          line-height: 1.5;
        }

        @media (max-width: 800px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
