/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "doubel": "rgba(0, 0, 0, 0.12) 5px 5px 15px, rgba(255, 255, 255, 0.85) -5px -5px 15px",
      }
    },
  },
  plugins: [],
}

