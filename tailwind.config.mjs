/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

      },
      fontFamily: {
        heroMain: ['var(--font-spoqa-bold)', 'sans-serif'],
        heroSub: ['var(--font-spoqa-regular)', 'sans-serif'],
        mainFont: ['var(--font-main)', 'sans-serif']
      }
    },
  },
  plugins: [typography],
};
