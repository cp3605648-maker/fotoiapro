import SeoLandingPage from "../../components/seo/SeoLandingPage";
import { seoPages } from "../../data/seoPages";
import { getRelatedPages } from "../../lib/seo/getRelatedPages";

export default function DynamicSeoPage({ page, relatedPages }) {
  return <SeoLandingPage {...page} relatedPages={relatedPages} />;
}

export async function getStaticPaths() {
  return {
    paths: seoPages.map((page) => ({
      params: { slug: page.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = seoPages.find((item) => item.slug === params.slug);
  const relatedPages = getRelatedPages(params.slug, 4);

  return {
    props: {
      page,
      relatedPages,
    },
  };
}
