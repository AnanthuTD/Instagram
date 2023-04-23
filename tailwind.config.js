/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'side_bar_hover': '#121212',
        'side_bar_border': '#363837',
        brightBlue: '#00c2f7',
      }
    },
  },
  plugins: [],
}
