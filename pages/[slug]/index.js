import SeoLandingPage from "../../components/seo/SeoLandingPage";
import { seoPages } from "../../data/seoPages";

export default function DynamicSeoPage({ page }) {
  return <SeoLandingPage {...page} />;
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

  return {
    props: {
      page,
    },
  };
}
