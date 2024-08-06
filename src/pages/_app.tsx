import RootLayout from "@/components/Layout";
import type { AppProps } from "next/app";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${jetbrainsMono.style.fontFamily};
        }
      `}</style>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
};

export default App;
