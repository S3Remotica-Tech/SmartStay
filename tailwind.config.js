/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
     
     zIndex: {
        70: "70",
        80: "80",
        90: "90",
        9999:"9999"
        },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

