import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(360deg, #FEEF9F 52.25%, #F1C861 57.92%, #CE993C 61.86%, #C89036 66.74%, #D9B15E 70.37%, #FBE756 79.5%, #FBF4AD 83.76%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'game-bg': 'url("/images/background.jpg")',
        'win-bg': 'url("/images/win.jpg")',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        moul: ['var(--moul-font)'],
      },
    },
  },
  plugins: [],
};
export default config;
