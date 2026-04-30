import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        peach: "#C7A06A",
        camel: "#C7A06A",
        ink: "#000000",
        bone: "#F7F3EF"
      },
      fontFamily: {
        serif: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"]
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.32,0.72,0,1)"
      }
    }
  },
  plugins: []
};

export default config;
