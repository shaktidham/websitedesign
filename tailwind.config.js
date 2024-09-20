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
      screens: {
        'sm': '640px',
        'xsm':"425px",
        'md': '769px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'custom': '900px', // Custom breakpoint example
      },
    },
  },
  plugins: [],
}
