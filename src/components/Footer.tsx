import Link from "next/link";
import SocialIcon from "./SocialIcon";
import { nav, site, socials } from "@/lib/site";

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-[0.875rem] text-ink-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-sm text-ink-faint">
            {site.location} · {site.availability}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-[0.875rem] text-ink-faint transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <span className="ml-1 flex items-center gap-4 border-l border-line pl-5">
            {socials.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className="p-1 text-ink-faint transition-colors hover:text-accent"
              >
                <SocialIcon id={item.id} className="h-[15px] w-[15px]" />
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
