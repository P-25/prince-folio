import Link from "next/link";
import type { GetStaticProps } from "next";
import JsonLd from "@/components/JsonLd";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/content";
import { blogSchema, breadcrumbSchema, collectionSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import type { PostMeta } from "@/lib/types";

interface BlogIndexProps {
  posts: PostMeta[];
}

const DESCRIPTION =
  "Notes on WordPress, JavaScript, performance and shipping web products — from Prince Sharma, a senior full stack developer.";

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  const empty = posts.length === 0;

  return (
    <>
      <Seo title="Writing — Prince Sharma" description={DESCRIPTION} path="/blog" />
      <JsonLd
        data={[
          // An empty Blog listing says nothing useful, so describe the page
          // itself until there is something to list.
          empty
            ? collectionSchema({
                name: `Writing — ${site.name}`,
                description: DESCRIPTION,
                path: "/blog",
              })
            : blogSchema(posts),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
          ]),
        ]}
      />

      <div className="shell pb-6 pt-6 md:pb-10 md:pt-12">
        <h1 className="display text-balance">Notes from the build.</h1>
        <p className="lede mt-3 max-w-prose">
          Things I&apos;ve worked out the hard way — WordPress at scale,
          JavaScript, performance, and the unglamorous parts of shipping.
        </p>
      </div>

      <section className="shell pb-8">
        {empty ? (
          <div className="border-y border-line py-20 text-center">
            <p className="chip">
              <span className="pulse-dot" aria-hidden="true" />
              Coming soon
            </p>
            <p className="display-sm mx-auto mt-7 max-w-[22ch] text-balance">
              The first posts are being written.
            </p>
            <p className="lede mx-auto mt-5 max-w-prose">
              I&apos;m putting together write-ups on the work behind the
              numbers on my home page — headless migrations, WooCommerce at
              scale, and payment integrations that had to hold up in
              production.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/games" variant="outline">
                See the games
              </Button>
              <Button href={`mailto:${site.email}`} variant="ghost">
                Get in touch
              </Button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-12"
                >
                  <div className="meta pt-1.5">
                    <span>{post.dateLabel}</span>
                    <span className="mt-1 block text-ink-faint">
                      {post.readingTime} min read
                    </span>
                  </div>

                  <div className="max-w-prose">
                    <h2 className="display-sm transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                        {post.description}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <p className="mt-4 text-[0.875rem] text-ink-faint">
                        {post.tags.join(" · ")}
                      </p>
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
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => ({
  props: { posts: getAllPosts() },
});

export default BlogIndex;
