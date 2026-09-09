/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './script.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FFC80B',
          hover: '#E0AE00',
          dark: '#111827',
          green: '#88C425',
        },
      },
    },
  },
  plugins: [],
};