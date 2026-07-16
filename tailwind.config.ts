import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0C",
        char: "#131316",
        fog: "#1F1F24",
        smoke: "#2A2A32",
        bone: "#F0EDE6",
        pearl: "#C7C3BA",
        ash: "#7C7871",
        stone: "#4C4A46",
        acid: {
          DEFAULT: "#D6FF3B",
          dim: "#A8CC2E",
        },
        blush: "#FF6B4A",
        violet: "#6C5CE7",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Fraunces", "Iowan Old Style", "serif"],
        display: ["var(--font-serif)", "Fraunces", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.72rem", { lineHeight: "1", letterSpacing: "0.22em" }],
        mega:    ["clamp(4rem, 15vw, 15rem)",   { lineHeight: "0.9",  letterSpacing: "-0.045em" }],
        hero:    ["clamp(3rem, 10vw, 10rem)",   { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        display: ["clamp(2.25rem, 6vw, 5.5rem)", { lineHeight: "1.0",  letterSpacing: "-0.03em" }],
        h2:      ["clamp(1.75rem, 4.2vw, 3.5rem)",{ lineHeight: "1.06",letterSpacing: "-0.025em"}],
        h3:      ["clamp(1.375rem, 2.4vw, 2rem)",  { lineHeight: "1.15",letterSpacing: "-0.02em" }],
        lede:    ["clamp(1.125rem, 1.4vw, 1.4rem)", { lineHeight: "1.55" }],
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-expo":  "cubic-bezier(0.16, 1, 0.3, 1)",
        editorial:   "cubic-bezier(0.2, 0.9, 0.2, 1)",
      },
      maxWidth: {
        page: "1440px",
        measure: "64ch",
      },
      keyframes: {
        marquee:  { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        blinker:  { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
        fadeUp:   { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        blinker: "blinker 2.4s ease-in-out infinite",
        "fade-up": "fadeUp 720ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
