import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "Helvetica Neue", "sans-serif"],
        display: ["Georgia", "ui-serif", "serif"],
      },
      colors: {
        parchment: "#f6f1e7",
        ink: "#1a1a1a",
        rose: "#b85450",
        mint: "#4a7c59",
        amber: "#d68910",
      },
      fontSize: {
        // Accessibility: large defaults per GDD §9.1
        base: ["1.25rem", { lineHeight: "1.75rem" }],
        lg: ["1.5rem", { lineHeight: "2rem" }],
        xl: ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  plugins: [],
};

export default config;
