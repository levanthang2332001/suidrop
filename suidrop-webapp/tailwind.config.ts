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
        primary: '#0D4C6B',
        secondary: '#FF5722',
        accent: '#FFC107',
        dark: '#1A1A1A',
        cream: {
          50: '#FFFBF7',
        },
        meme: {
          background: '#FEF3D7',
          border: '#999999',
          primary: '#FFC107',
          primaryDark: '#004A77',
          heading: '#FFD600',
          text: '#333333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config; 