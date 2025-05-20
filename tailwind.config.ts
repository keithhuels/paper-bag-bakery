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
        brand: {
          light: '#f5f0e3',
          selected: '#ffffff',
          bag: '#d8ad74',
          bread: '#d98a32',
          dark: '#3d2b14'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
