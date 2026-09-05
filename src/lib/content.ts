/**
 * Build-time content loader.
 *
 * Posts and games are plain HTML files with a small metadata block at the
 * top, kept in /content. Nothing else is needed to publish: drop a file in,
 * and the matching route is generated on the next build.
 *
 *   content/blog/my-post.html
 *   content/games/my-game.html
 *
 * Only ever imported from getStaticProps / getStaticPaths.
 */
import fs from "fs";
import path from "path";
import type { Game, GameMeta, Policy, Post, PostMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

type Frontmatter = Record<string, string>;

/** Splits a `--- key: value ---` header off the top of a file. */
function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const source = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: source.trim() };

  const data: Frontmatter = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1 || line.trimStart().startsWith("#")) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1");
    // A key may be repeated to build a list (screenshot:, feature:). Later
    // values are appended, so toLines() can split them back apart.
    if (!key) continue;
    data[key] = key in data ? `${data[key]}\n${value}` : value;
  }

  return { data, body: source.slice(match[0].length).trim() };
}

/** Values of a repeated frontmatter key, in the order they were written. */
function toLines(value?: string): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Splits `left :: right` into a pair, tolerating a missing right side. */
function splitPair(line: string): [string, string] {
  const index = line.indexOf("::");
  if (index === -1) return [line.trim(), ""];
  return [line.slice(0, index).trim(), line.slice(index + 2).trim()];
}

function toList(value?: string): string[] {
  if (!value) return [];
  return value
    .replace(/^\[(.*)\]$/, "$1")
    .split(",")
    .map((item) => item.trim().replace(/^["'](.*)["']$/, "$1"))
    .filter(Boolean);
}

function isTruthy(value?: string): boolean {
  return /^(true|yes|1)$/i.test((value ?? "").trim());
}

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Rough reading time from the visible text of the HTML body. */
function readingTime(html: string): number {
  const words = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Intrinsic size of an image in /public, read straight from its header so
 * artwork of any shape lays out correctly without being configured.
 * Understands PNG, JPEG and WebP; anything else falls back to the caller's
 * default.
 */
function imageSize(publicPath: string): { width: number; height: number } | null {
  try {
    const file = path.join(
      process.cwd(),
      "public",
      publicPath.replace(/^\//, "")
    );
    const buffer = fs.readFileSync(file);

    // PNG: IHDR always comes first, width and height as big-endian uint32.
    if (buffer.length > 24 && buffer.toString("ascii", 12, 16) === "IHDR") {
      return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    }

    // WebP: a RIFF container whose first chunk says which coding was used.
    if (
      buffer.length > 30 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    ) {
      const chunk = buffer.toString("ascii", 12, 16);
      if (chunk === "VP8X") {
        return {
          width: 1 + buffer.readUIntLE(24, 3),
          height: 1 + buffer.readUIntLE(27, 3),
        };
      }
      if (chunk === "VP8 ") {
        // 3-byte frame tag, 3-byte sync code, then 14-bit dimensions.
        return {
          width: buffer.readUInt16LE(26) & 0x3fff,
          height: buffer.readUInt16LE(28) & 0x3fff,
        };
      }
      if (chunk === "VP8L") {
        const bits = buffer.readUInt32LE(21);
        return {
          width: (bits & 0x3fff) + 1,
          height: ((bits >> 14) & 0x3fff) + 1,
        };
      }
    }

    // JPEG: walk the marker segments looking for a start-of-frame.
    if (buffer.length > 4 && buffer.readUInt16BE(0) === 0xffd8) {
      let offset = 2;
      while (offset + 9 < buffer.length) {
        if (buffer[offset] !== 0xff) break;
        const marker = buffer[offset + 1];
        const length = buffer.readUInt16BE(offset + 2);
        // SOF0-SOF15, skipping the four non-frame markers in that range.
        if (
          marker >= 0xc0 &&
          marker <= 0xcf &&
          ![0xc4, 0xc8, 0xcc].includes(marker)
        ) {
          return {
            height: buffer.readUInt16BE(offset + 5),
            width: buffer.readUInt16BE(offset + 7),
          };
        }
        offset += 2 + length;
      }
    }
  } catch {
    // A missing or unreadable file must not fail the build.
  }
  return null;
}

type Kind = "blog" | "games" | "privacy";

function readDir(kind: Kind): string[] {
  const dir = path.join(CONTENT_DIR, kind);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".html"));
}

function readFile(kind: Kind, file: string) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, kind, file), "utf8");
  return { slug: file.replace(/\.html$/, ""), ...parseFrontmatter(raw) };
}

const byNewest = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const isPublished = (item: { draft: boolean }) =>
  process.env.NODE_ENV === "development" || !item.draft;

/* --------------------------------- blog --------------------------------- */

function toPost(slug: string, data: Frontmatter, body: string): Post {
  const date = data.date || "1970-01-01";
  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date,
    dateLabel: formatDate(date),
    tags: toList(data.tags),
    readingTime: readingTime(body),
    cover: data.cover || null,
    draft: isTruthy(data.draft),
    html: body,
  };
}

export function getAllPosts(): PostMeta[] {
  return readDir("blog")
    .map((file) => {
      const { slug, data, body } = readFile("blog", file);
      const { html, ...meta } = toPost(slug, data, body);
      return meta;
    })
    .filter(isPublished)
    .sort(byNewest);
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.html`;
  if (!readDir("blog").includes(file)) return null;
  const { data, body } = readFile("blog", file);
  return toPost(slug, data, body);
}

export function getPostSlugs(): string[] {
  return readDir("blog").map((file) => file.replace(/\.html$/, ""));
}

/* -------------------------------- games --------------------------------- */

function toGame(slug: string, data: Frontmatter, body: string): Game {
  const date = data.date || "1970-01-01";
  return {
    slug,
    title: data.title || slug,
    tagline: data.tagline || "",
    description: data.description || data.tagline || "",
    date,
    dateLabel: formatDate(date),
    status: data.status || "Released",
    platforms: toList(data.platforms),
    tech: toList(data.tech),
    playUrl: data.playurl || null,
    downloadUrl: data.downloadurl || null,
    sourceUrl: data.sourceurl || null,
    cover: data.cover || null,
    icon: data.icon || null,
    price: data.price || null,
    storeNote: data.storenote || null,
    version: data.version || null,
    developer: data.developer || null,
    // The game's own palette, used to tint its page.
    accent: data.accent || null,
    tint: data.tint || null,
    coverSize: data.cover ? imageSize(data.cover) : null,
    screenshots: toLines(data.screenshot).map((line) => {
      const [src, alt] = splitPair(line);
      const size = imageSize(src) ?? { width: 720, height: 1280 };
      return { src, alt, ...size };
    }),
    features: toLines(data.feature).map((line) => {
      const [title, body] = splitPair(line);
      return { title, body };
    }),
    draft: isTruthy(data.draft),
    html: body,
  };
}

export function getAllGames(): GameMeta[] {
  return readDir("games")
    .map((file) => {
      const { slug, data, body } = readFile("games", file);
      const { html, ...meta } = toGame(slug, data, body);
      return meta;
    })
    .filter(isPublished)
    .sort(byNewest);
}

export function getGame(slug: string): Game | null {
  const file = `${slug}.html`;
  if (!readDir("games").includes(file)) return null;
  const { data, body } = readFile("games", file);
  return toGame(slug, data, body);
}

export function getGameSlugs(): string[] {
  return readDir("games").map((file) => file.replace(/\.html$/, ""));
}

/* ------------------------- game privacy policies ------------------------ */

/**
 * Optional legal page per game, at content/privacy/<game slug>.html, served
 * from /games/<slug>/privacy-policy. Google Play requires a reachable privacy
 * policy URL for any published app.
 */
export function getPolicy(slug: string): Policy | null {
  const file = `${slug}.html`;
  if (!readDir("privacy").includes(file)) return null;

  const { data, body } = readFile("privacy", file);
  const updated = data.updated || data.date || "1970-01-01";
  return {
    slug,
    title: data.title || "Privacy Policy",
    game: data.game || slug,
    updated,
    updatedLabel: formatDate(updated),
    html: body,
  };
}

export function getPolicySlugs(): string[] {
  return readDir("privacy").map((file) => file.replace(/\.html$/, ""));
}

export function hasPolicy(slug: string): boolean {
  return readDir("privacy").includes(`${slug}.html`);
}
