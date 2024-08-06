import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex xl:justify-between justify-center items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            {"<"}
            <span className="text-accent">ps</span>
            {">"}
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
