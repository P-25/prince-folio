import RootLayout from "@/components/layout";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />;
    </RootLayout>
  );
};

export default App;
