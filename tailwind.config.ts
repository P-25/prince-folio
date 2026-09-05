import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,jsx,tsx,ts}",
    "./src/components/**/*.{js,jsx,tsx,ts}",
    "./src/**/*.{js,jsx,tsx,ts}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
    fontFamily: {
      sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
    },
    extend: {
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
        },
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },
      },
      maxWidth: {
        shell: "72rem",
        prose: "42rem",
      },
      letterSpacing: {
        display: "0.14em",
        label: "0.18em",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
