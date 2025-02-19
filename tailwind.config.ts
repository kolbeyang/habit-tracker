import type { Config } from "tailwindcss";
import colors from "./colors";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        workSans: ["var(--font-work-sans)", "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
