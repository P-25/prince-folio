import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SocialIcon from "./SocialIcon";
import { nav, site, socials } from "@/lib/site";

const Header: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const isCurrent = (href: string) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="font-mono text-base font-medium tracking-tight text-ink transition-colors hover:text-accent"
        >
          <span className="text-ink-faint">&lt;</span>
          ps
          <span className="text-ink-faint"> /&gt;</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-current={
                      !item.external && isCurrent(item.href) ? "page" : undefined
                    }
                    className={`font-mono text-[11px] uppercase tracking-label transition-colors hover:text-ink ${
                      !item.external && isCurrent(item.href)
                        ? "text-ink"
                        : "text-ink-faint"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="hidden items-center gap-4 border-l border-line pl-6 md:flex">
            {socials.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="block p-1 text-ink-faint transition-colors hover:text-accent"
                >
                  <SocialIcon id={item.id} className="h-[15px] w-[15px]" />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 p-2 font-mono text-[11px] uppercase tracking-label text-ink sm:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        hidden={!open}
        className="border-t border-line bg-paper sm:hidden"
      >
        <ul className="shell divide-y divide-line py-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block py-3.5 font-mono text-[11px] uppercase tracking-label text-ink-muted"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-6 py-4">
            {socials.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="p-1 text-ink-muted transition-colors hover:text-accent"
              >
                <SocialIcon id={item.id} className="h-[17px] w-[17px]" />
              </a>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
