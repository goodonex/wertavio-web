import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wertavio: {
          slate: "#1A1F2E",
          gold: "#B8902A",
          "gold-light": "#D4A843",
          cream: "#FAFAF5",
          white: "#FFFFFF",
          muted: "#6B7380",
          border: "#E4E2D8",
          "slate-soft": "#2A3045",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ctaIdleGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 0 rgba(184, 144, 42, 0), 0 0 0 0 rgba(184, 144, 42, 0)",
          },
          "50%": {
            boxShadow:
              "0 0 0 1px rgba(184, 144, 42, 0.35), 0 0 24px rgba(184, 144, 42, 0.22)",
          },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        "cta-idle-glow": "ctaIdleGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
