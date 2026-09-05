import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => (
  <>
    <Seo title="Not found — Prince Sharma" path="/404" noindex />
    <div className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <p className="label">Error 404</p>
      <h1 className="display mt-5 max-w-[14ch] text-balance">
        This page doesn&apos;t exist.
      </h1>
      <p className="lede mt-6 max-w-prose">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" variant="solid">
          Home
        </Button>
        <Button href="/blog" variant="outline">
          Writing
        </Button>
        <Button href="/games" variant="outline">
          Games
        </Button>
      </div>
    </div>
  </>
);

export default NotFound;
