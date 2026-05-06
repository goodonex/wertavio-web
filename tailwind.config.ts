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
          gold: "#C9A84C",
          "gold-light": "#DFC278",
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
        ctaRingPulse: {
          "0%, 49%": {
            boxShadow: "0 0 0 0 rgba(201, 168, 76, 0)",
          },
          "50%": {
            boxShadow: "0 0 0 0 rgba(201, 168, 76, 0.4)",
          },
          "62%": {
            boxShadow: "0 0 0 12px rgba(201, 168, 76, 0)",
          },
          "100%": {
            boxShadow: "0 0 0 12px rgba(201, 168, 76, 0)",
          },
        },
        ctaIdleGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 0 rgba(201, 168, 76, 0), 0 0 0 0 rgba(201, 168, 76, 0)",
          },
          "50%": {
            boxShadow:
              "0 0 0 1px rgba(201, 168, 76, 0.35), 0 0 24px rgba(201, 168, 76, 0.22)",
          },
        },
        logoShimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        "cta-idle-glow": "ctaIdleGlow 4s ease-in-out infinite",
        "cta-ring-pulse": "ctaRingPulse 6s ease-out infinite",
        "logo-shimmer": "logoShimmer 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
