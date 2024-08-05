import { JetBrains_Mono } from "next/font/google";

// components
import Header from "@/components/Header";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

const RootLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main className={jetbrainsMono.variable}>
      <Header />
      {children}
    </main>
  );
};

export default RootLayout;
