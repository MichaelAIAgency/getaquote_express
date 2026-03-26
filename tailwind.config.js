/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          hover:   'var(--brand-hover)',
          light:   'var(--brand-light)',
          text:    'var(--brand-text)',
          ring:    'var(--brand-ring)',
        },
      },
    },
  },
  plugins: [],
};
