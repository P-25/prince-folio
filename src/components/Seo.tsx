import Head from "next/head";
import { NextSeo } from "next-seo";
import { site } from "@/lib/site";

interface SeoProps {
  title: string;
  description?: string;
  /** Path only, e.g. "/blog/my-post". */
  path?: string;
  image?: string;
  /** Real pixel size of `image`, so crawlers do not have to fetch it. */
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
  publishedAt?: string;
  tags?: string[];
  noindex?: boolean;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description = site.description,
  path = "/",
  image = site.ogImage,
  imageWidth = 1200,
  imageHeight = 1200,
  type = "website",
  publishedAt,
  tags,
  noindex,
}) => {
  const url = `${site.url}${path === "/" ? "" : path}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        noindex={noindex}
        nofollow={noindex}
        openGraph={{
          type,
          locale: "en_US",
          url,
          siteName: `${site.name} — Portfolio`,
          title,
          description,
          images: [
            {
              url: image,
              width: imageWidth,
              height: imageHeight,
              alt: title,
            },
          ],
          ...(type === "article" && publishedAt
            ? {
                article: {
                  publishedTime: publishedAt,
                  modifiedTime: publishedAt,
                  authors: [site.url],
                  tags,
                },
              }
            : {}),
        }}
        twitter={{
          handle: site.twitterHandle,
          site: site.twitterHandle,
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          { name: "author", content: site.name },
          ...(tags?.length
            ? [{ name: "keywords", content: tags.join(", ") }]
            : []),
        ]}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${site.name} — Writing`}
          href={`${site.url}/feed.xml`}
        />
      </Head>
    </>
  );
};

export default Seo;
