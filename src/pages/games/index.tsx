import Image from "next/image";
import Link from "next/link";
import type { GetStaticProps } from "next";
import JsonLd from "@/components/JsonLd";
import Seo from "@/components/Seo";
import { getAllGames } from "@/lib/content";
import { breadcrumbSchema, collectionSchema } from "@/lib/seo";
import type { GameMeta } from "@/lib/types";

interface GamesIndexProps {
  games: GameMeta[];
}

const GamesIndex: React.FC<GamesIndexProps> = ({ games }) => (
  <>
    <Seo
      title="Games — Prince Sharma"
      description="Games I build on the side — what they are, where to play them, and where to download."
      path="/games"
    />
    <JsonLd
      data={[
        collectionSchema({
          name: "Games",
          description:
            "Games built by Prince Sharma — what they are, where to play them and where to download.",
          path: "/games",
        }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Games", path: "/games" },
        ]),
      ]}
    />

    <div className="shell py-16 md:py-24">
      <p className="label">Games</p>
      <h1 className="display mt-5 max-w-[16ch] text-balance">
        Things I build when nobody&apos;s specced them.
      </h1>
      <p className="lede mt-6 max-w-prose">
        Side projects with a play or download link attached. No roadmap, no
        clients — just whatever idea stuck long enough to finish.
      </p>
    </div>

    <section className="shell pb-8">
      {games.length === 0 ? (
        <p className="border-y border-line py-16 text-center font-mono text-[11px] uppercase tracking-label text-ink-faint">
          No games published yet — check back soon
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {games.map((game) => (
            <li key={game.slug} className="card">
              <Link
                href={`/games/${game.slug}`}
                className="group block h-full p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label">{game.status}</span>
                  <span className="label">{game.dateLabel}</span>
                </div>

                {game.icon && (
                  <span className="relative mt-5 block h-16 w-16 overflow-hidden rounded-[22%] border border-line bg-white">
                    <Image
                      src={game.icon}
                      alt={`${game.title} app icon`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                )}

                <h2 className="display-sm mt-4 transition-colors group-hover:text-accent">
                  {game.title}
                </h2>

                {game.tagline && (
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                    {game.tagline}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-label text-ink-faint">
                  {game.platforms.length > 0 && (
                    <span>{game.platforms.join(" · ")}</span>
                  )}
                  {game.playUrl && <span className="text-accent">Play</span>}
                  {game.downloadUrl && (
                    <span className="text-accent">Download</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  </>
);

export const getStaticProps: GetStaticProps<GamesIndexProps> = async () => ({
  props: { games: getAllGames() },
});

export default GamesIndex;
