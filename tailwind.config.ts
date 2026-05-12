import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mc: {
          orange: "#D4621B",
          "orange-light": "#E87840",
          "orange-dark": "#B8501A",
          dark: "#0E0D14",
          "dark-card": "#16151F",
          cream: "#FAF7F2",
          "gray-100": "#F2F0EB",
          "gray-200": "#E4E1DA",
          "gray-400": "#9B9794",
          text: "#1A1826",
          "text-muted": "#6B6867",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      animation: {
        "ticker": "ticker 30s linear infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
