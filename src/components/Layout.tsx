// components
import Header from "@/components/Header";

const RootLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
