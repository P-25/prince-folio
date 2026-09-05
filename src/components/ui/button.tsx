import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border font-mono text-[11px] uppercase tracking-label transition-colors duration-300",
  {
    variants: {
      variant: {
        solid: "border-ink bg-ink text-paper hover:border-accent hover:bg-accent",
        outline:
          "border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
        ghost: "border-transparent bg-transparent text-ink-muted hover:text-ink",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  }
);

type Variants = VariantProps<typeof buttonVariants>;

type ButtonProps = Variants &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AnchorProps = Variants &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Renders an <a>/<Link> when given `href`, otherwise a <button>. */
function Button(props: ButtonProps | AnchorProps) {
  const { className, variant, size, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as AnchorProps;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href) || href.endsWith(".pdf");

    if (isExternal) {
      return <a href={href} className={classes} {...anchorProps} />;
    }
    return <Link href={href} className={classes} {...anchorProps} />;
  }

  return <button className={classes} {...(rest as ButtonProps)} />;
}

export { Button, buttonVariants };
