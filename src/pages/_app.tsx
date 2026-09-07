import RootLayout from "@/components/Layout";
import type { AppProps } from "next/app";
import { Cormorant_Garamond, JetBrains_Mono, Jost } from "next/font/google";
import "@/styles/globals.css";

// Geometric sans. Variable, so no weight list is needed.
const sans = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// High-contrast display serif. It is a light, small-on-the-body face, so the
// display sizes in globals.css are set larger than they were for a sturdier
// serif, and headings run at 500/600 rather than 400.
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const App = ({ Component, pageProps }: AppProps) => (
  // `font-sans` is repeated here on purpose: the font variables are declared
  // on this element, so the same rule on <body> resolves to nothing and
  // content would otherwise inherit the browser's default serif.
  <div
    className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans`}
  >
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  </div>
);

export default App;
