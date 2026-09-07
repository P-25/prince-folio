import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SocialIcon from "./SocialIcon";
import { nav, site, socials } from "@/lib/site";

/**
 * A dark bar floating over the paper, rather than a rule drawn across it.
 * The primary action (Resume) sits at the far right in cream so it reads as
 * the one button on the page.
 */
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

  // Resume is the call to action, so it is pulled out of the link list.
  const links = nav.filter((item) => !item.external);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto max-w-shell rounded-2xl border border-white/10 bg-ink shadow-[0_10px_30px_-12px_rgba(28,27,24,0.5)]">
        <div className="flex h-14 items-center gap-4 px-4 sm:h-16 sm:px-5">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="font-mono text-base font-medium tracking-tight text-paper transition-colors hover:text-white"
          >
            <span className="text-white/40">&lt;</span>
            ps
            <span className="text-white/40">/&gt;</span>
          </Link>

          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6 pl-2">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={`text-[0.875rem] transition-colors hover:text-paper ${
                      isCurrent(item.href) ? "text-paper" : "text-white/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <ul className="hidden items-center gap-3 md:flex">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="block p-1 text-white/50 transition-colors hover:text-paper"
                  >
                    <SocialIcon id={item.id} className="h-[15px] w-[15px]" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-[0.875rem] text-ink transition-colors hover:bg-white sm:inline-flex"
            >
              Resume
              <span aria-hidden="true" className="text-ink-faint">
                +
              </span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-1 p-2 text-[0.875rem] text-paper sm:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          hidden={!open}
          className="border-t border-white/10 px-4 pb-4 sm:hidden"
        >
          <ul className="divide-y divide-white/10">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3.5 text-[0.875rem] text-white/70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between gap-4">
            <ul className="flex items-center gap-4">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="block p-1 text-white/60 transition-colors hover:text-paper"
                  >
                    <SocialIcon id={item.id} className="h-[17px] w-[17px]" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-[0.875rem] text-ink"
            >
              Resume
              <span aria-hidden="true" className="text-ink-faint">
                +
              </span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
