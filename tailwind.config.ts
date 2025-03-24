import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navbarcolor : "#151B54"
      },
      fontFamily: {
        // sans: ['Poppins', 'sans-serif'],// Use Google Font 'Roboto' for sans-serif
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
} satisfies Config;
