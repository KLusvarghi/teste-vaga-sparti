import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nav: '#D5D8DD',
        box: '#A1A1A1',
        primary: '#354C76',
        secundary: '#263248',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        loader: 'loader 1s linear infinite',
      },
      keyframes: {
        loader: {
          '0%': { transform: 'rotate(0deg)' }, 
          '100%': { transform: 'rotate(360deg)' }, 
        },
      },
    },
  },
  plugins: [],
};
export default config;
