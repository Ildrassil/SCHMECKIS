/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'double': 'rgba(0, 0, 0, 0.2) 5px 5px 15px, rgba(255, 255, 255, 0.79) -5px -5px 15px',
            }
        },
    },
    plugins: [],
}

