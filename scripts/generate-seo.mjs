/**
 * Regenerates public/sitemap.xml and public/feed.xml from the routes and
 * content files. Runs automatically before every build via `prebuild`.
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://princesharma.dev";
const AUTHOR = "Prince Sharma";
const root = process.cwd();

const escape = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Reads the metadata block off each content file in a folder. */
function entriesFrom(kind) {
  const dir = path.join(root, "content", kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".html"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const header = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---/);
      const meta = header?.[1] ?? "";
      const field = (name) =>
        meta.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1].trim();
      return {
        slug: file.replace(/\.html$/, ""),
        title: field("title"),
        description: field("description") ?? field("tagline"),
        date: field("date"),
        updated: field("updated"),
        draft: /^draft:\s*(true|yes|1)\s*$/im.test(meta),
      };
    })
    .filter((entry) => !entry.draft);
}

const today = new Date().toISOString().slice(0, 10);
const isDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? "");

const posts = entriesFrom("blog").sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);
const games = entriesFrom("games");
const policies = entriesFrom("privacy");

/* ------------------------------- sitemap -------------------------------- */

const urls = [
  { loc: "/", changefreq: "monthly", priority: "1.0", lastmod: today },
  { loc: "/blog", changefreq: "weekly", priority: "0.8", lastmod: today },
  { loc: "/games", changefreq: "weekly", priority: "0.8", lastmod: today },
  ...posts.map((post) => ({
    loc: `/blog/${post.slug}`,
    changefreq: "yearly",
    priority: "0.7",
    lastmod: isDate(post.date) ? post.date : today,
  })),
  ...games.map((game) => ({
    loc: `/games/${game.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: isDate(game.date) ? game.date : today,
  })),
  ...policies.map((policy) => ({
    loc: `/games/${policy.slug}/privacy-policy`,
    changefreq: "yearly",
    priority: "0.3",
    lastmod: isDate(policy.updated) ? policy.updated : today,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${SITE}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap, "utf8");

/* --------------------------------- feed --------------------------------- */

const rfc822 = (value) =>
  new Date(isDate(value) ? value : today).toUTCString();

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(AUTHOR)} — Writing</title>
    <link>${SITE}/blog</link>
    <description>Notes on WordPress, JavaScript, performance and shipping web products.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(posts[0]?.date)}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${post.slug}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escape(post.description)}</description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(root, "public", "feed.xml"), feed, "utf8");

console.log(`sitemap.xml: ${urls.length} URLs · feed.xml: ${posts.length} posts`);
