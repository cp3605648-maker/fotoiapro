import { seoPages } from "../data/seoPages";

const SITE_URL = "https://www.fotoia.pro";

function generateSitemap() {
  const routes = [
    "",
    "/login",
    "/contact",
    "/privacy",
    "/terms",
    "/refunds",
    ...seoPages.map((page) => `/${page.slug}`),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    return `  <url>
    <loc>${SITE_URL}${route}</loc>
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(generateSitemap());
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
