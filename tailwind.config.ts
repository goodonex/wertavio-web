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
          "slate-soft": "#2A3045",
          gold: "#C9A84C",
          "gold-light": "#DFC278",
          /** Gold für Text/Linien auf hellem Grund (AA auf cream). */
          "gold-ink": "#85671C",
          cream: "#FAFAF5",
          stone: "#F1EEE5",
          white: "#FFFFFF",
          muted: "#5E6573",
          border: "#E4E2D8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(26, 31, 46, 0.04), 0 12px 32px -12px rgba(26, 31, 46, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
