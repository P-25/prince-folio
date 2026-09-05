# Content

Posts and games are plain HTML files. Drop a file in, run a build, and the
matching page is generated. Nothing else is needed — no CMS, no database.

```
content/
  blog/<slug>.html    ->  /blog/<slug>
  games/<slug>.html   ->  /games/<slug>
```

The filename becomes the URL slug, so `content/blog/hello-world.html` is served
at `/blog/hello-world`. Use lowercase words separated by hyphens.

## File format

Every file starts with a metadata block between two `---` lines, followed by
the page body as ordinary HTML. Do not wrap the body in `<html>` or `<body>` —
just the content.

### Blog post

```html
---
title: Making WooCommerce fast
description: One sentence shown in the list and in link previews.
date: 2026-08-18
tags: WordPress, Performance
draft: false
---

<p>Your post, written as HTML.</p>

<h2>A section heading</h2>
<p>More text. <strong>Bold</strong>, <em>italic</em> and
<a href="https://example.com">links</a> all work.</p>
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Headline of the post |
| `description` | no | Shown in the list and used for SEO / social previews |
| `date` | yes | `YYYY-MM-DD`. Sorts the list, newest first |
| `tags` | no | Comma separated |
| `cover` | no | Path in `/public`, e.g. `/assets/post-cover.jpg` |
| `draft` | no | `true` hides it from the live site |

Reading time is calculated automatically from the body text.

### Game

A game's page is a **promo page** — icon, screenshots, highlights and a
download button — so it carries more fields than a post.

```html
---
title: My Game
tagline: One line that sells it, shown on the list and under the title.
description: Slightly longer text used for SEO and social previews.
date: 2026-06-10
status: Released
price: Free
version: 1.0.3
developer: P26 Games
platforms: Android
tech: Godot 4, GDScript
icon: /assets/games/my-game/icon.png
accent: "#cf8a3c"
tint: "#f7efe0"
playUrl: https://play.google.com/store/apps/details?id=my.game
downloadUrl: https://example.com/my-game.apk
sourceUrl: https://github.com/P-25/my-game

feature: One hundred levels :: A full run that starts gentle and ends hard.
feature: Play offline :: No account, no sign-in, no internet needed.

screenshot: /assets/games/my-game/shot-1.png :: A packed board
screenshot: /assets/games/my-game/shot-2.png :: The level select screen
---

<p>What the game is, written for players rather than developers.</p>
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Name of the game |
| `tagline` | no | One line, shown on the list and under the title |
| `description` | no | Used for SEO / social previews |
| `date` | yes | `YYYY-MM-DD`. Sorts the list, newest first |
| `status` | no | Free text — `Released`, `In development`, `Prototype`. Defaults to `Released` |
| `price` | no | e.g. `Free`. Shown in the meta row and details |
| `version` | no | Shown as `v1.0.3` |
| `developer` | no | Publisher name |
| `platforms` | no | Comma separated |
| `tech` | no | Comma separated, shown in the details panel |
| `icon` | no | Square app icon in `/public`. Shown large in the hero and on the list |
| `accent` | no | Hex colour for that game's buttons — use the game's own palette |
| `tint` | no | Hex colour for the hero and closing bands |
| `playUrl` | no | Adds the **Play now** button, opens in a new tab |
| `downloadUrl` | no | Adds the **Download** button, opens in a new tab |
| `sourceUrl` | no | Adds the **Source** link |
| `storeNote` | no | Shown instead of the buttons when there is no store link yet, e.g. `Coming soon to Google Play` |
| `cover` | no | Wide key art in `/public`. Used for link previews only — it is not shown on the page; falls back to `icon` |
| `draft` | no | `true` hides it from the live site |

**Repeatable fields.** `feature:` and `screenshot:` can each appear as many
times as you like, and the order you write them is the order they appear. Both
split their line on `::`:

| Field | Format | Notes |
| --- | --- | --- |
| `feature` | `Title :: One sentence` | Rendered as the Highlights cards |
| `screenshot` | `/path.png :: Alt text` | A scrolling strip. The text is alt text only — nothing is shown under the image. Any aspect works; the size is read from the file |

Leave any optional field out and the matching element is simply not rendered —
no screenshots means no screenshots section, no highlights means no highlights
section.

## Drafts

`draft: true` keeps an entry out of production builds but still shows it when
running `npm run dev`, so you can preview work in progress at its real URL.

## Notes

- The body HTML is rendered as-is, so only put content here that you wrote.
- Styling is handled by the site — write plain semantic HTML and it will match
  the rest of the design. `h2`, `h3`, `p`, `ul`, `ol`, `blockquote`, `pre`,
  `code`, `img`, `figure`, `table` and `hr` are all styled.
- The three most recent posts and games are also surfaced on the home page.

## Game privacy policies

A game can have a privacy policy page — Google Play requires a reachable
privacy policy URL for any published app. Add a file named after the game's
slug:

```
content/privacy/my-game.html  ->  /games/my-game/privacy-policy
```

```html
---
title: Privacy Policy
game: My Game
updated: 2026-09-05
---

<p>Policy text, written as HTML.</p>
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | no | Defaults to `Privacy Policy` |
| `game` | yes | Display name of the game, used in the heading and back links |
| `updated` | yes | `YYYY-MM-DD`, shown as "Last updated" |

When the file exists, a **Privacy policy** link appears automatically in the
details panel on that game's page. No other change is needed.
