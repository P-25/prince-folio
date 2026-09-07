import Image from "next/image";
import Link from "next/link";
import type { GameMeta } from "@/lib/types";

/**
 * A game as a stacked "sheet": key art on top, then the date and status, the
 * title, and one line about it. Shared by /games and the home page so both
 * stay identical.
 */
const GameCard: React.FC<{ game: GameMeta }> = ({ game }) => {
  // Key art first, then the opening screenshot, then the icon — whichever the
  // game actually has.
  const art = game.cover ?? game.screenshots[0]?.src ?? game.icon;
  const artSize = game.cover
    ? game.coverSize
    : game.screenshots[0]
      ? { width: game.screenshots[0].width, height: game.screenshots[0].height }
      : null;

  return (
    <div className="relative h-full">
      {/* The sheet peeking out behind, as if this card sits on a small pile. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 -bottom-1.5 top-3 rounded-2xl border border-line bg-surface"
      />

      <Link
        href={`/games/${game.slug}`}
        className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-3 shadow-[0_1px_2px_rgba(28,27,24,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_28px_-16px_rgba(28,27,24,0.45)]"
      >
        {art && (
          <div
            className="relative overflow-hidden rounded-xl border border-line"
            style={{ backgroundColor: game.tint ?? "var(--paper)" }}
          >
            <Image
              src={art}
              alt=""
              width={artSize?.width ?? 1200}
              height={artSize?.height ?? 630}
              sizes="(max-width: 640px) 100vw, 380px"
              className="h-[136px] w-full object-cover object-center sm:h-[168px]"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.875rem] text-ink-faint">
              {game.dateLabel}
            </span>
            <span className="rounded-full bg-accent px-2.5 py-1 text-[0.75rem] font-medium text-white">
              {game.status}
            </span>
          </div>

          <h3 className="mt-3 text-[1.35rem] font-bold leading-snug tracking-tight transition-colors group-hover:text-accent">
            {game.title}
          </h3>

          {game.tagline && (
            <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-ink-muted sm:line-clamp-3">
              {game.tagline}
            </p>
          )}

          {game.platforms.length > 0 && (
            <p className="mt-auto pt-3 text-[0.875rem] text-ink-faint">
              {game.platforms.join(" · ")}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
