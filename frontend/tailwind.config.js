/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        "textPrime": "#646464",
        "textHeader": "#333",
        "offWhite": "#ecf0f3"

      },
      boxShadow: {
        "doubleOut": "rgba(255, 255, 255, 1) -10px -10px 40px, #d1d9e6 10px 10px 40px",
        "doubleIn": "inset rgba(255, 255, 255, 1) 14px 14px 40px, inset #d1d9e6 -14px -14px 40px",
        "buttonIn": "inset rgba(255, 255, 255, 1) 11px 11px 20px, inset #d1d9e6 -11px -11px 20px",
        "buttonOut": "rgba(255, 255, 255, 1) -11px -11px 20px, #d1d9e6 11px 11px 20px",
        "hashtagbutton": "inset rgba(255, 255, 255, 1) 3px 3px 12px, inset #d1d9e6 -3px -3px 12px",
      }
    },
  },
  plugins: [],
}

