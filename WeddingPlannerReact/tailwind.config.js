/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf6f7',
          100: '#f9e8ec',
          200: '#f2d0d8',
          300: '#e8aab8',
          400: '#d97d91',
          500: '#c8556e',
          600: '#b03d56',
          700: '#933146',
          800: '#7b2c3d',
          900: '#692936',
          950: '#3a1219',
        },
        champagne: {
          DEFAULT: '#c9a962',
          light: '#e8d9b4',
          dark: '#9a7b3c',
        },
        cream: {
          DEFAULT: '#faf7f5',
          dark: '#f0ebe6',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(58, 18, 25, 0.12)',
        card: '0 8px 32px -8px rgba(58, 18, 25, 0.15)',
      },
    },
  },
  plugins: [],
}
