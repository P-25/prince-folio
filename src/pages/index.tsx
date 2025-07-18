// components
import Photo from "@/components/Photo";
import Social from "@/components/Social";
import { Button } from "@/components/ui/button";
import { NextSeo } from "next-seo";

const Home: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Prince Sharma - Software Developer | WordPress & JavaScript Expert"
        description="Professional WordPress and JavaScript developer with 5+ years of experience. Specializing in modern web development."
        canonical="https://princesharma.dev"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://princesharma.dev",
          siteName: "Prince Sharma Portfolio",
          title:
            "Prince Sharma - Software Developer | WordPress & JavaScript Expert",
          description:
            "Professional WordPress and JavaScript developer with 5+ years of experience. Specializing in modern web development.",
          images: [
            {
              url: "https://princesharma.dev/assets/profile.webp",
              width: 1200,
              height: 630,
              alt: "Prince Sharma - Software Developer",
            },
          ],
        }}
        twitter={{
          handle: "@_shprince",
          site: "@_shprince",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "software developer, WordPress developer, JavaScript developer, web development, frontend developer, React developer, portfolio",
          },
          {
            name: "author",
            content: "Prince Sharma",
          },
          {
            name: "robots",
            content: "index, follow",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            type: "image/x-icon",
            href: "/favicon.ico",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
          },
        ]}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Prince Sharma",
            jobTitle: "Software Developer",
            description:
              "Professional WordPress and JavaScript developer with 5+ years of experience",
            url: "https://princesharma.dev",
            sameAs: [
              "https://github.com/P-25",
              "https://www.linkedin.com/in/shprince",
              "https://twitter.com/_shprince",
              "https://buymeacoffee.com/princesharma",
            ],
            image: "https://princesharma.dev/assets/profile.webp",
            knowsAbout: [
              "WordPress Development",
              "JavaScript",
              "React",
              "Web Development",
              "Frontend Development",
            ],
            worksFor: {
              "@type": "Organization",
              name: "Appycodes",
            },
          }),
        }}
      />

      <div className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0">
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
            {/* text */}
            <div className="text-center xl:text-left order-2 xl:order-none">
              <span className="text-xl">Software Developer</span>
              <h1 className="h1 mb-6">
                Hello, <br /> I&apos;m{" "}
                <span className="text-accent">Prince</span>
              </h1>
              <p className="max-w-[500px] mb-9 text-white/80">
                Professional WordPress, JavaScript developer with more than 5+
                years of experience.
              </p>
              {/* btn and socials */}
              <div className="flex flex-col xl:flex-row items-center gap-8">
                <a href="/assets/Resume.pdf" download>
                  <Button
                    variant="outline"
                    size="lg"
                    className="uppercase flex items-center gap-2"
                  >
                    <span>Download CV</span>
                  </Button>
                </a>
                <div className="mb-8 xl:mb-0">
                  <Social
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 xl:order-none mb-8 xl:mb-0">
              <Photo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
