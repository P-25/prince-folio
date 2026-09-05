/**
 * schema.org builders. Everything here describes what is actually on the
 * page — structured data that overstates the page is worse than none.
 */
import { site, socials, toolkit } from "./site";
import type { GameMeta, PostMeta } from "./types";

const absolute = (path: string) =>
  path.startsWith("http") ? path : `${site.url}${path}`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  email: site.email,
  image: site.ogImage,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Siliguri",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  worksFor: { "@type": "Organization", name: "Appycodes" },
  knowsAbout: toolkit,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.name} — ${site.role}`,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#person` },
};

/** Breadcrumb trail. Pass every crumb including the current page. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

export function blogSchema(posts: PostMeta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    url: `${site.url}/blog`,
    name: `Writing — ${site.name}`,
    description:
      "Notes on WordPress, JavaScript, performance and shipping web products.",
    inLanguage: "en",
    author: { "@id": `${site.url}/#person` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${site.url}/blog/${post.slug}`,
      datePublished: post.date,
      keywords: post.tags.join(", ") || undefined,
    })),
  };
}

export function postSchema(post: PostMeta) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description || undefined,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    wordCount: post.readingTime * 220,
    keywords: post.tags.join(", ") || undefined,
    image: post.cover ? absolute(post.cover) : site.ogImage,
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/blog#blog` },
  };
}

/**
 * A game is described as both a VideoGame and a mobile application — the
 * pairing is what makes app-style rich results eligible.
 */
export function gameSchema(game: GameMeta) {
  const url = `${site.url}/games/${game.slug}`;
  const image = [game.cover, game.icon, ...game.screenshots.map((s) => s.src)]
    .filter(Boolean)
    .map((path) => absolute(path as string));

  return {
    "@context": "https://schema.org",
    "@type": ["VideoGame", "MobileApplication"],
    "@id": `${url}#game`,
    name: game.title,
    url,
    description: game.description || game.tagline,
    inLanguage: "en",
    applicationCategory: "GameApplication",
    gamePlatform: game.platforms,
    operatingSystem: game.platforms.join(", ") || undefined,
    softwareVersion: game.version || undefined,
    datePublished: game.date,
    image: image.length > 0 ? image : undefined,
    screenshot: game.screenshots.map((shot) => absolute(shot.src)),
    author: { "@id": `${site.url}/#person` },
    publisher: game.developer
      ? { "@type": "Organization", name: game.developer }
      : { "@id": `${site.url}/#person` },
    // Only claim a price when the page states one.
    offers: game.price
      ? {
          "@type": "Offer",
          price: /free/i.test(game.price) ? "0" : game.price,
          priceCurrency: "USD",
          availability: game.playUrl
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          url: game.playUrl || url,
        }
      : undefined,
  };
}

export function collectionSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${site.url}${opts.path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#person` },
  };
}

/**
 * Appends the site suffix only while the whole title still fits in the ~60
 * characters search results show. A truncated headline reads worse than an
 * unbranded one.
 */
export function pageTitle(main: string): string {
  const suffix = ` — ${site.name}`;
  return main.length + suffix.length <= 60 ? `${main}${suffix}` : main;
}
