import Link from "next/link";
import type { GetStaticProps } from "next";
import Photo from "@/components/Photo";
import RichText from "@/components/RichText";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import Seo from "@/components/Seo";
import SocialIcon from "@/components/SocialIcon";
import { Button } from "@/components/ui/button";
import { getAllGames, getAllPosts } from "@/lib/content";
import { personSchema, websiteSchema } from "@/lib/seo";
import {
  capabilities,
  clients,
  experience,
  hero,
  proof,
  site,
  socials,
  toolkit,
} from "@/lib/site";
import type { GameMeta, PostMeta } from "@/lib/types";

interface HomeProps {
  posts: PostMeta[];
  games: GameMeta[];
}

const ArrowLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="group font-mono text-[11px] uppercase tracking-label text-ink-faint transition-colors hover:text-ink"
  >
    {children}
    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
      &rarr;
    </span>
  </Link>
);

const Home: React.FC<HomeProps> = ({ posts, games }) => {
  return (
    <>
      <Seo title={`${site.name} — ${site.role}`} path="/" />
      <JsonLd data={[personSchema, websiteSchema]} />

      {/* ------------------------------ hero ------------------------------ */}
      <section className="shell">
        <div className="grid animate-rise items-start gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <div className="max-w-2xl">
            <p className="label">{site.role}</p>

            <h1 className="wordmark mt-5 text-[clamp(1.5rem,4.4vw,2.15rem)] leading-tight">
              {site.name}
            </h1>

            <p className="mt-2 font-mono text-xs uppercase tracking-label text-ink-muted">
              {site.tagline}
            </p>

            <div className="my-8 h-px w-16 bg-line-strong" />

            <p className="display max-w-[24ch] text-balance">{hero.headline}</p>

            <p className="lede mt-7 max-w-prose">
              <RichText segments={hero.statement} />
            </p>

            <p className="chip mt-8">
              <span className="pulse-dot" aria-hidden="true" />
              {site.availability}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={site.resume} variant="solid" download>
                View resume
              </Button>
              <Button href={`mailto:${site.email}`} variant="outline">
                Get in touch
              </Button>
            </div>

            {/* The header hides these below md, so surface them here instead
                of leaving the menu as the only way to reach them. */}
            <ul className="mt-6 flex flex-wrap gap-3 md:hidden">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="card flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-accent"
                  >
                    <SocialIcon id={item.id} className="h-[17px] w-[17px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stacked above the text on small screens it just pushes the
              content down, so it only appears once the layout goes wide. */}
          <div className="hidden lg:block lg:pt-4">
            <Photo />
          </div>
        </div>
      </section>

      {/* --------------------------- capabilities -------------------------- */}
      <Section label="What I do">
        {/* Two columns with an even number of cards — a partial row would
            expose the hairline background as an empty block. */}
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {capabilities.map((item) => (
            <article key={item.title} className="bg-paper p-7 sm:p-8">
              <h3 className="display-sm">{item.title}</h3>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-label text-accent">
                {item.stack}
              </p>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* ------------------------------ proof ------------------------------ */}
      <Section label="Evidence from shipped work">
        <div className="divide-y divide-line border-y border-line">
          {proof.map((item) => (
            <article
              key={item.title}
              className="grid gap-6 py-9 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12"
            >
              <p className="label pt-1">{item.kicker}</p>
              <div className="max-w-prose">
                <h3 className="display-sm">{item.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-muted">
                  {item.body}
                </p>
                <p className="mt-5 border-l-2 border-accent pl-4 text-[0.95rem] leading-relaxed text-ink-muted">
                  <span className="font-mono text-[11px] uppercase tracking-label text-accent">
                    Result&nbsp;
                  </span>
                  <RichText segments={item.result} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* --------------------------- track record -------------------------- */}
      <Section label="Track record">
        <div className="divide-y divide-line border-y border-line">
          {experience.map((role) => (
            <div
              key={role.company}
              className="grid gap-2 py-7 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12"
            >
              <p className="label pt-1">{role.period}</p>
              <div className="max-w-prose">
                <h3 className="text-lg font-semibold">{role.company}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-label text-ink-faint">
                  {role.title}
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                  {role.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12">
          <p className="label pt-1">Worked with teams at</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {clients.map((client) => (
              <li key={client} className="text-[0.95rem] text-ink-muted">
                {client}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12">
          <p className="label pt-1">Toolkit</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {toolkit.map((tool) => (
              <li
                key={tool}
                className="font-mono text-[11px] uppercase tracking-label text-ink-faint"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ------------------------------ writing ---------------------------- */}
      {posts.length > 0 && (
        <Section
          label="Writing"
          action={<ArrowLink href="/blog">All posts</ArrowLink>}
        >
          <ul className="divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-2 py-6 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-12"
                >
                  <span className="label pt-1.5">{post.dateLabel}</span>
                  <span className="max-w-prose">
                    <span className="block text-lg font-medium transition-colors group-hover:text-accent">
                      {post.title}
                    </span>
                    {post.description && (
                      <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-ink-muted">
                        {post.description}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ------------------------------- games ----------------------------- */}
      {games.length > 0 && (
        <Section
          label="Games"
          action={<ArrowLink href="/games">All games</ArrowLink>}
        >
          {/* Standalone boxes rather than a hairline grid: the number of
              games varies, so a row is often only part-filled. */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <li key={game.slug} className="card">
                <Link
                  href={`/games/${game.slug}`}
                  className="group block h-full p-7 sm:p-8"
                >
                  <span className="label">{game.status}</span>
                  <span className="display-sm mt-3 block transition-colors group-hover:text-accent">
                    {game.title}
                  </span>
                  {game.tagline && (
                    <span className="mt-3 block text-[0.95rem] leading-relaxed text-ink-muted">
                      {game.tagline}
                    </span>
                  )}
                  {game.platforms.length > 0 && (
                    <span className="mt-5 block font-mono text-[11px] uppercase tracking-label text-ink-faint">
                      {game.platforms.join(" · ")}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ------------------------------ contact ---------------------------- */}
      <Section id="contact" label="Contact">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="display max-w-[16ch] text-balance">
              Have something worth building?
            </p>
            <p className="lede mt-6 max-w-prose">
              I&apos;m open to international remote opportunities. If
              you&apos;re hiring for full-stack or mobile work, tell me what
              you&apos;re building and I&apos;ll tell you honestly whether
              I&apos;m the right person for it.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-ink mt-7 inline-block font-mono text-sm tracking-wide"
            >
              {site.email}
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-3 gap-y-2">
            {socials.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="card flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-accent"
                >
                  <SocialIcon id={item.id} className="h-[17px] w-[17px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    posts: getAllPosts().slice(0, 3),
    games: getAllGames().slice(0, 3),
  },
});

export default Home;
