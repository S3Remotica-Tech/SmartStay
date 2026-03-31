/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
            animation: {
        blink: "blink 1s infinite",
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        scroll: "scroll 20s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      zIndex: {
        70: "70",
        80: "80",
        90: "90",
        9999: "9999"
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        montserrat: ['Montserrat', 'sans-serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
        tasa: ['"TASA Orbiter"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

