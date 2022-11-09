/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        md: '0 0px 4px -1px rgba(0, 0, 0, 0.26), 0 2px 4px -1px rgba(0, 0, 0, 0.26)',
      },
      colors: {
        default: {
          100: '#c2d1da',
          200: '#a6bcc9',
          300: '#89a7b7',
          400: '#6d91a6',
          500: '#577a8e',
          600: '#344955',
          700: '#233139',
          800: '#11181c',
          900: '#000000',
        },
        accent: {
          50: '#65E7E6',
          100: '#56E5E3',
          200: '#45E2E0',
          300: '#32DFDD',
          400: '#1EDCDA',
          500: '#08D9D6',
          600: '#07C5C3',
          700: '#06B3B1',
          800: '#05A3A1',
          900: '#059492',
        },
        secondary: {
          default: '#FFD166'
        }
      },
      spacing: {
        '100': '25rem',
      },
      keyframes: {
        fade_up: {
          '0%': { opacity: 0, transform: 'translateY(20%)' },
          '100%': { opacity: 1, transform: 'translateY(0%)' },
        },
        fade_in: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade_up': 'fade_up .1s linear forwards',
        'fade_in': 'fade_in .1s linear forwards',
      },
    },
  },
  plugins: [],
}
