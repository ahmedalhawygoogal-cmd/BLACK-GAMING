import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: {
          DEFAULT: "#0F1420",
          soft: "#121A29",
        },
        line: "rgba(255,255,255,0.07)",
        accent: {
          purple: "#8B5CF6",
          cyan: "#06B6D4",
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cta: "0 12px 32px -12px rgba(139, 92, 246, 0.55)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
