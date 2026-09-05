export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  tags: string[];
  readingTime: number;
  cover: string | null;
  draft: boolean;
}

export interface Post extends PostMeta {
  html: string;
}

export interface Screenshot {
  src: string;
  /** Alt text only — screenshots carry no visible caption. */
  alt: string;
  width: number;
  height: number;
}

export interface Feature {
  title: string;
  body: string;
}

export interface GameMeta {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  dateLabel: string;
  /** e.g. "Released", "In development", "Prototype" */
  status: string;
  platforms: string[];
  tech: string[];
  playUrl: string | null;
  downloadUrl: string | null;
  sourceUrl: string | null;
  cover: string | null;
  /** Intrinsic size of the cover, read from the file at build time. */
  coverSize: { width: number; height: number } | null;
  /** Square app icon. */
  icon: string | null;
  price: string | null;
  /** Shown in place of the buttons when there is no store link yet. */
  storeNote: string | null;
  version: string | null;
  developer: string | null;
  /** The game's own palette, used to tint its page. */
  accent: string | null;
  tint: string | null;
  screenshots: Screenshot[];
  features: Feature[];
  draft: boolean;
}

export interface Game extends GameMeta {
  html: string;
}

/** A legal page attached to a game, e.g. its privacy policy. */
export interface Policy {
  /** Matches the game's slug. */
  slug: string;
  title: string;
  /** Name of the game the policy belongs to. */
  game: string;
  updated: string;
  updatedLabel: string;
  html: string;
}
