import Head from "next/head";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Prince Sharma | WordPress & JavaScript Developer (5+ Yrs)</title>
        <meta
          name="description"
          content="Professional WordPress and JavaScript developer with 5+ years of experience building scalable, high-performance websites."
        />
        <meta
          name="keywords"
          content="WordPress, JavaScript, Web Developer, Prince Sharma, Frontend, Backend"
        />
        <meta name="author" content="Prince Sharma" />
        <meta
          property="og:title"
          content="Prince Sharma | WordPress & JavaScript Developer"
        />
        <meta
          property="og:description"
          content="Experienced in creating fast, SEO-optimized, and scalable web solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      {children}
    </>
  );
}
