import GameCard from "@/components/GameCard";
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

    <div className="shell pb-6 pt-6 md:pb-10 md:pt-12">
      {/* No width cap: the heading sets on one line once there is room. */}
      <h1 className="display text-balance">
        Things I build when nobody&apos;s specced them.
      </h1>
      <p className="lede mt-3 max-w-prose">
        Side projects with a play or download link attached. No roadmap, no
        clients — just whatever idea stuck long enough to finish.
      </p>
    </div>

    <section className="shell pb-12">
      {games.length === 0 ? (
        <p className="border-y border-line py-16 text-center text-[0.875rem] text-ink-faint">
          No games published yet — check back soon
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <li key={game.slug}>
              <GameCard game={game} />
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
