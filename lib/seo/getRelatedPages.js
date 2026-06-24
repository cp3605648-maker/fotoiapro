import { seoPages } from "../../data/seoPages";

export function getRelatedPages(currentSlug, limit = 4) {
  const currentPage = seoPages.find((page) => page.slug === currentSlug);

  if (!currentPage) return [];

  const sameCategory = seoPages.filter(
    (page) =>
      page.slug !== currentSlug &&
      page.category &&
      page.category === currentPage.category
  );

  const others = seoPages.filter(
    (page) =>
      page.slug !== currentSlug &&
      (!page.category || page.category !== currentPage.category)
  );

  return [...sameCategory, ...others].slice(0, limit);
}
