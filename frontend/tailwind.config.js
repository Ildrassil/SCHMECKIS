/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      },

      colors: {
        "textPrime": "#646464",
        "textHeader": "#333",
        "offWhite": "#ecf0f3"

      },
      boxShadow: {
        "doubleOut": "rgba(255, 255, 255, 1) -10px -10px 40px, #d1d9e6 10px 10px 40px",
        "doubleIn": "inset rgba(255, 255, 255, 1) -14px -14px 30px, inset #d1d9e6 14px 14px 30px",
        "buttonIn": "inset rgba(255, 255, 255, 1) -5px -5px 8px, inset #d1d9e6 5px 5px 8px",
        "buttonOut": "rgba(255, 255, 255, 1) -11px -11px 20px, #d1d9e6 11px 11px 20px",
        "hashtagbutton": "inset rgba(255, 255, 255, 1) -5px -5px 8px, inset #d1d9e6 5px 5px 8px",
        "hashtagbuttonOut": "rgba(255, 255, 255, 1) -5px -5px 8px,  #d1d9e6 5px 5px 8px",

        "kategorieIn": "inset rgba(255, 255, 255, 0.8) -6px -6px 16px, inset #d1d9e6 6px 6px 16px",
      }
    },
  },
  variants: {
    extend: {
      maxHeight: ['responsive', 'hover', 'focus', 'active'],
      transitionDuration: ['responsive', 'hover', 'focus', 'active'],
    },
  },
  plugins: [typography],
}

