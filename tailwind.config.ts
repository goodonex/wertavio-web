import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    /** Ein Radius für alles: 2px wie im Markenpaket. */
    borderRadius: {
      none: "0",
      sm: "2px",
      DEFAULT: "2px",
      md: "2px",
      lg: "2px",
      xl: "2px",
      "2xl": "2px",
      "3xl": "2px",
      full: "9999px",
    },
    extend: {
      colors: {
        /**
         * Markenpaket Richtung B (marken/wertavio/farben/tokens.css). Alte Schlüssel bleiben, die Werte sind neu:
         * slate = Petrol (Fläche, Überschriften), gold = Orange (nur Knopf, Messpunkt, Markierung, nie Fläche).
         */
        wertavio: {
          slate: "#143F44",
          "slate-soft": "#103135",
          ink: "#17282A",
          gold: "#E8641E",
          "gold-light": "#EE8B56",
          /** Orange für Text und Links auf hellem Grund (5,18:1 auf Papier). */
          "gold-ink": "#A94512",
          cream: "#F1F0E8",
          stone: "#E4E6DF",
          white: "#FFFFFF",
          muted: "#4E6466",
          border: "#CDD5D1",
          /** Nebentext und Linien auf Petrol */
          nebel: "#A9C3C0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20, 63, 68, 0.06), 0 18px 40px -24px rgba(20, 63, 68, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
