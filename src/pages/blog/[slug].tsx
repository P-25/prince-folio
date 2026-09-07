import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import JsonLd from "@/components/JsonLd";
import Seo from "@/components/Seo";
import { getPost, getPostSlugs } from "@/lib/content";
import { breadcrumbSchema, pageTitle, postSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Post } from "@/lib/types";

interface PostPageProps {
  post: Post;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => (
  <>
    <Seo
      title={pageTitle(post.title)}
      description={post.description}
      path={`/blog/${post.slug}`}
      image={post.cover ? `${site.url}${post.cover}` : undefined}
      type="article"
      publishedAt={post.date}
      tags={post.tags}
      noindex={post.draft}
    />
    <JsonLd
      data={[
        postSchema(post),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      ]}
    />

    <article className="shell py-14 md:py-20">
      <div className="mx-auto max-w-prose">
        <Link
          href="/blog"
          className="text-[0.875rem] text-ink-faint transition-colors hover:text-ink"
        >
          &larr;&nbsp; Writing
        </Link>

        <header className="mt-10">
          <p className="meta">
            {post.dateLabel} · {post.readingTime} min read
            {post.draft && " · Draft"}
          </p>
          <h1 className="display mt-4 text-balance">{post.title}</h1>
          {post.description && (
            <p className="lede mt-5">{post.description}</p>
          )}
          {post.tags.length > 0 && (
            <p className="mt-6 text-[0.875rem] text-ink-faint">
              {post.tags.join(" · ")}
            </p>
          )}
        </header>

        <div className="my-10 h-px w-full bg-line" />

        {/* Post body, authored as HTML in /content/blog. */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-16 border-t border-line pt-8">
          <p className="text-[0.95rem] text-ink-muted">
            Written by {site.name}. Questions or corrections —{" "}
            <a href={`mailto:${site.email}`} className="link-ink">
              {site.email}
            </a>
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-block text-[0.875rem] text-ink-faint transition-colors hover:text-ink"
          >
            &larr;&nbsp; All posts
          </Link>
        </footer>
      </div>
    </article>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getPostSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const post = getPost(String(params?.slug));
  if (!post) return { notFound: true };
  return { props: { post } };
};

export default PostPage;
