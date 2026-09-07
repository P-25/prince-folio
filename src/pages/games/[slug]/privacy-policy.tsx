import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import JsonLd from "@/components/JsonLd";
import Seo from "@/components/Seo";
import { getPolicy, getPolicySlugs } from "@/lib/content";
import { breadcrumbSchema, pageTitle } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Policy } from "@/lib/types";

interface PolicyPageProps {
  policy: Policy;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ policy }) => (
  <>
    <Seo
      title={pageTitle(`${policy.title} — ${policy.game}`)}
      description={`Privacy policy for ${policy.game}, a mobile game by ${site.name}.`}
      path={`/games/${policy.slug}/privacy-policy`}
    />
    <JsonLd
      data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Games", path: "/games" },
        { name: policy.game, path: `/games/${policy.slug}` },
        {
          name: policy.title,
          path: `/games/${policy.slug}/privacy-policy`,
        },
      ])}
    />

    <article className="shell py-14 md:py-20">
      <div className="mx-auto max-w-prose">
        <Link
          href={`/games/${policy.slug}`}
          className="text-[0.875rem] text-ink-faint transition-colors hover:text-ink"
        >
          &larr;&nbsp; {policy.game}
        </Link>

        <header className="mt-10">
          <p className="meta">Last updated {policy.updatedLabel}</p>
          <h1 className="display mt-4 text-balance">{policy.title}</h1>
        </header>

        <div className="my-10 h-px w-full bg-line" />

        {/* Policy body, authored as HTML in /content/privacy. */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: policy.html }}
        />

        <footer className="mt-16 border-t border-line pt-8">
          <Link
            href={`/games/${policy.slug}`}
            className="text-[0.875rem] text-ink-faint transition-colors hover:text-ink"
          >
            &larr;&nbsp; Back to {policy.game}
          </Link>
        </footer>
      </div>
    </article>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getPolicySlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PolicyPageProps> = async ({
  params,
}) => {
  const policy = getPolicy(String(params?.slug));
  if (!policy) return { notFound: true };
  return { props: { policy } };
};

export default PolicyPage;
