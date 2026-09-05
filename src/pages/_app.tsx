import RootLayout from "@/components/Layout";
import type { AppProps } from "next/app";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
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
