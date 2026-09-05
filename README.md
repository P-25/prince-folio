# Prince Sharma — Portfolio

An editorial, content-first portfolio built with Next.js, TypeScript and
Tailwind CSS. Minimal by design: one focused home page, plus writing and games
sections generated from plain HTML files.

**Live:** [princesharma.dev](https://princesharma.dev)

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero, what I do, evidence from shipped work, track record, latest writing, games, contact |
| `/blog` | All posts, newest first |
| `/blog/[slug]` | A post, generated from `content/blog/<slug>.html` |
| `/games` | All games |
| `/games/[slug]` | A game, generated from `content/games/<slug>.html` |

Every route is statically generated at build time.

## Publishing content

Posts and games are plain HTML files with a short metadata block at the top.
Drop a file into `content/blog` or `content/games`, rebuild, and the page
exists — no CMS, no database, no external service.

```
content/blog/my-post.html   ->  /blog/my-post
content/games/my-game.html  ->  /games/my-game
```

See [`content/README.md`](content/README.md) for the metadata fields and a
full example of each.

Set `draft: true` to keep something out of production while still previewing
it at its real URL with `npm run dev`.

## Editing the site copy

Everything on the home page — the positioning statement, capabilities, proof
cards, roles, toolkit, social links and contact details — lives in
[`src/lib/site.ts`](src/lib/site.ts). Change the copy there rather than in the
page components.

## Design

| Token | Value |
| --- | --- |
| Paper | `#f4f2ed` |
| Surface | `#fbfaf7` |
| Ink | `#1c1b18` |
| Muted ink | `#6b6862` |
| Accent | `#1f4b99` |

Three typefaces, each with one job: **Instrument Serif** for display
headlines, **Inter** for body and UI, **JetBrains Mono** for labels, metadata
and tags. Tokens are defined in
[`src/styles/globals.css`](src/styles/globals.css) and exposed to Tailwind in
[`tailwind.config.ts`](tailwind.config.ts).

## Tech

Next.js 14 (Pages Router) · TypeScript · Tailwind CSS · next-seo

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Development server, drafts visible |
| `npm run build` | Regenerates the sitemap and feed, then builds for production |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run seo` | Regenerates `public/sitemap.xml` and `public/feed.xml` on their own |

## SEO

Every route ships a unique title and description, a canonical URL, Open Graph
and Twitter card tags, and schema.org JSON-LD — `Person` and `WebSite` on the
home page, `BlogPosting` on posts, `VideoGame`/`MobileApplication` on games,
and a `BreadcrumbList` on every nested page. Titles drop the site suffix when
keeping it would push them past the ~60 characters search results show.

`public/sitemap.xml` and `public/feed.xml` (an RSS feed of the blog) are
generated from the routes and content files by
[`scripts/generate-seo.mjs`](scripts/generate-seo.mjs), which runs
automatically before every build. Drafts are excluded from both.

## Deployment

Push to GitHub and connect the repository to Vercel — no configuration needed.
Any host that supports Next.js works.

## Contact

- **Website** — [princesharma.dev](https://princesharma.dev)
- **LinkedIn** — [shprince](https://www.linkedin.com/in/shprince)
- **GitHub** — [P-25](https://github.com/P-25)
- **X** — [@\_shprince](https://twitter.com/_shprince)
