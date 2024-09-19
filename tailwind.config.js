/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gujarati: ['Noto Sans Gujarati', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
