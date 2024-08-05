import Link from "next/link";

const Header: React.FC = () => {
  const LogoText = "</ps>";
  return (
    <div className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            <span className="text-accent">{LogoText}</span>
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
