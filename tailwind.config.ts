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
          orange: "#D0BD6A",
          "orange-light": "#DDD18A",
          "orange-dark": "#A8964A",
          dark: "#0A132A",
          "dark-card": "#132351",
          cream: "#FFFFFF",
          "gray-100": "#F4F4F2",
          "gray-200": "#E6E4DF",
          "gray-400": "#9B9794",
          text: "#0A132A",
          "text-muted": "#5C6780",
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
