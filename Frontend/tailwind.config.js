/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'taupe': '#4A4238',
        'charcoal': '#4D5359',
        'pine-blue': '#508484',
      }
    },
  },
  plugins: [],
}