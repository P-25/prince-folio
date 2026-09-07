import Image from "next/image";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import JsonLd from "@/components/JsonLd";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getGame, getGameSlugs, hasPolicy } from "@/lib/content";
import { breadcrumbSchema, gameSchema, pageTitle } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Game } from "@/lib/types";

interface GamePageProps {
  game: Game;
  /** Whether this game has a privacy policy page to link to. */
  policy: boolean;
}

/**
 * A game's page is a promo page, not a write-up: icon, screenshots, what it
 * plays like, and a download button that is never more than a screen away.
 * It borrows the game's own palette so it feels like an extension of the app.
 */
const GamePage: React.FC<GamePageProps> = ({ game, policy }) => {
  const theme = {
    "--game-accent": game.accent ?? "var(--accent)",
    "--game-tint": game.tint ?? "var(--surface)",
  } as React.CSSProperties;

  const meta = [
    game.price,
    game.platforms.join(" · ") || null,
    game.version ? `v${game.version}` : null,
    game.developer,
  ].filter(Boolean);

  const hasStoreLink = Boolean(game.downloadUrl || game.playUrl);

  // Without a store link there is nothing to press, so say where it stands
  // rather than leaving the hero with a hole in it.
  const store = !hasStoreLink ? (
    game.storeNote ? (
      <p className="chip">{game.storeNote}</p>
    ) : null
  ) : (
    <div className="flex flex-wrap items-center gap-3">
      {game.downloadUrl && (
        <Button
          href={game.downloadUrl}
          variant="solid"
          size="md"
          target="_blank"
          rel="noopener noreferrer"
          className="border-[color:var(--game-accent)] bg-[color:var(--game-accent)] hover:border-ink hover:bg-ink"
        >
          Download
        </Button>
      )}
      {game.playUrl && (
        <Button
          href={game.playUrl}
          variant={game.downloadUrl ? "outline" : "solid"}
          size="md"
          target="_blank"
          rel="noopener noreferrer"
          className={
            game.downloadUrl
              ? undefined
              : "border-[color:var(--game-accent)] bg-[color:var(--game-accent)] hover:border-ink hover:bg-ink"
          }
        >
          Play now
        </Button>
      )}
      {game.sourceUrl && (
        <Button
          href={game.sourceUrl}
          variant="ghost"
          size="md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </Button>
      )}
    </div>
  );

  return (
    <div style={theme}>
      <Seo
        title={pageTitle(game.title)}
        description={game.description || game.tagline}
        path={`/games/${game.slug}`}
        // The wide cover crops far better in a link preview than a square icon.
        image={
          game.cover
            ? `${site.url}${game.cover}`
            : game.icon
              ? `${site.url}${game.icon}`
              : undefined
        }
        imageWidth={game.cover ? game.coverSize?.width : undefined}
        imageHeight={game.cover ? game.coverSize?.height : undefined}
        noindex={game.draft}
      />
      <JsonLd
        data={[
          gameSchema(game),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Games", path: "/games" },
            { name: game.title, path: `/games/${game.slug}` },
          ]),
        ]}
      />

      {/* ------------------------------ hero ------------------------------ */}
      <section className="border-b border-line bg-[color:var(--game-tint)]">
        <div className="shell py-12 md:py-16">
          <Link
            href="/games"
            className="text-[0.875rem] text-ink-faint transition-colors hover:text-ink"
          >
            &larr;&nbsp; Games
          </Link>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
            {game.icon && (
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[22%] border border-line bg-white shadow-sm sm:h-28 sm:w-28">
                <Image
                  src={game.icon}
                  alt={`${game.title} app icon`}
                  fill
                  priority
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="min-w-0">
              <p className="meta">{game.status}</p>
              <h1 className="display mt-3 text-balance">{game.title}</h1>
              {game.tagline && (
                <p className="lede mt-4 max-w-prose">{game.tagline}</p>
              )}

              {meta.length > 0 && (
                <p className="mt-6 text-[0.875rem] text-ink-faint">
                  {meta.join("  ·  ")}
                </p>
              )}

              <div className="mt-7">{store}</div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- screenshots -------------------------- */}
      {game.screenshots.length > 0 && (
        <section className="border-b border-line">
          <div className="shell py-12 md:py-14">
            <h2 className="label mb-8">Screenshots</h2>
          </div>
          {/* Full-bleed strip: it should look like it continues past the edge. */}
          {/* scroll-pl matches the padding, or snapping hides it on load. */}
          <ul className="-mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-12 scroll-pl-6 sm:px-8 sm:scroll-pl-8 lg:px-12 lg:scroll-pl-12">
            {game.screenshots.map((shot) => (
              // Height is fixed and width follows the image, so portrait
              // screenshots and landscape art can share one strip.
              <li
                key={shot.src}
                className="shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-[color:var(--game-tint)]"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt || `${game.title} screenshot`}
                  width={shot.width}
                  height={shot.height}
                  sizes="280px"
                  className="h-[380px] w-auto sm:h-[440px]"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------------------- highlights -------------------------- */}
      {game.features.length > 0 && (
        <section className="border-b border-line">
          <div className="shell py-14 md:py-16">
            <h2 className="label mb-8">Highlights</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {game.features.map((feature) => (
                <li key={feature.title} className="card h-full p-7">
                  <h3 className="display-sm">{feature.title}</h3>
                  {feature.body && (
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                      {feature.body}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------ about ----------------------------- */}
      <section className="border-b border-line">
        <div className="shell py-14 md:py-16">
          <h2 className="label mb-8">About</h2>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
            {/* Body copy, authored as HTML in /content/games. */}
            <div
              className="prose max-w-prose"
              dangerouslySetInnerHTML={{ __html: game.html }}
            />

            <aside className="lg:pt-1">
              <dl className="border-t border-line">
                {[
                  ["Status", game.status],
                  ["Platforms", game.platforms.join(", ")],
                  ["Price", game.price],
                  ["Version", game.version],
                  ["Developer", game.developer],
                  ["Built with", game.tech.join(", ")],
                  ["Updated", game.dateLabel],
                ]
                  .filter(([, value]) => Boolean(value))
                  .map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-line py-3"
                    >
                      <dt className="meta pt-0.5">{label}</dt>
                      <dd className="text-[0.95rem] text-ink-muted">{value}</dd>
                    </div>
                  ))}
              </dl>

              {policy && (
                <Link
                  href={`/games/${game.slug}/privacy-policy`}
                  className="mt-5 inline-block text-[0.875rem] text-ink-faint transition-colors hover:text-accent"
                >
                  Privacy policy
                </Link>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* --------------------------- closing cta -------------------------- */}
      {hasStoreLink && (
        <section className="bg-[color:var(--game-tint)]">
          <div className="shell flex flex-col items-start gap-7 py-14 md:flex-row md:items-center md:justify-between">
            <p className="display-sm max-w-[22ch] text-balance">
              Get {game.title.split(":")[0]} on{" "}
              {game.platforms[0] ?? "your device"}.
            </p>
            {store}
          </div>
        </section>
      )}

      <div className="shell py-10">
        <Link
          href="/games"
          className="text-[0.875rem] text-ink-faint transition-colors hover:text-ink"
        >
          &larr;&nbsp; All games
        </Link>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getGameSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<GamePageProps> = async ({
  params,
}) => {
  const slug = String(params?.slug);
  const game = getGame(slug);
  if (!game) return { notFound: true };
  return { props: { game, policy: hasPolicy(slug) } };
};

export default GamePage;
