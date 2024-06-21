import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: {
        '50': '#f1fafe',
        '100': '#e1f4fd',
        '200': '#bde8fa',
        '300': '#83d8f6',
        '400': '#48c6f0',
        '500': '#18acdf',
        '600': '#0b8bbe',
        '700': '#0a6f9a',
        '800': '#0d5e7f',
        '900': '#104e6a',
        '950': '#0b3146',
      }
    }
  },
  plugins: [],
};
export default config;
