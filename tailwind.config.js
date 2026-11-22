/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        blink: "blink 1s infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
        scroll: "scroll 20s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      // SmartStay design tokens — Figma "Mobile UI component" (MeZzgNAFFUwdfEEjh0y0dB),
      // see docs/SmartStay-Design-System.md. Scales have numeric shades only (no
      // DEFAULT) so Bootstrap's bg-primary / text-success / bg-danger are untouched;
      // the Figma "default" grey scale is named `ink` because Tailwind's `neutral`
      // is already used in the app.
      colors: {
        primary: {
          50: "#EDEFFE", 100: "#97ABFE", 200: "#7590FA", 300: "#5072F9", 400: "#2C53F2",
          500: "#1E45E1", 600: "#2C3ED3", 700: "#2031BB", 800: "#132197", 900: "#0D1B8E",
        },
        ink: {
          50: "#FAFAFA", 100: "#F4F4F5", 200: "#E5E7EA", 400: "#9EA2AE", 500: "#6D717F",
          600: "#4D5461", 700: "#394050", 800: "#212936", 900: "#131927",
          DEFAULT: "#222222", muted: "#71717A",
        },
        success: {
          50: "#E8FAF0", 100: "#D1F4E0", 200: "#A2E9C1", 300: "#74DFA2", 400: "#45D483",
          500: "#17C964", 600: "#12A150", 700: "#038C46", 800: "#095028", 900: "#095028",
        },
        warning: {
          50: "#FEFCE8", 100: "#FDEDD3", 200: "#FBDBA7", 300: "#F9C97C", 400: "#F7B750",
          500: "#F5A524", 600: "#C4841D", 700: "#936316", 800: "#62420E", 900: "#312107",
        },
        danger: {
          50: "#FEE7EF", 100: "#FDD0DF", 200: "#FAA0BF", 300: "#F871A0", 400: "#F54180",
          500: "#F31260", 600: "#C20E4D", 700: "#920B3A", 800: "#610726", 900: "#310413",
        },
        // Form-field anatomy (SmartStay decisions, see CLAUDE.md).
        field: {
          border: "#DEDEE0", placeholder: "#71717A", text: "#18181B",
          hover: "rgba(249,249,249,0.92)", focus: "#0485F7", error: "#FF383C",
        },
      },
      borderRadius: {
        small: "8px",
        medium: "12px",
        large: "14px",
      },
      // Figma type scale (Gilroy): [size, { lineHeight }].
      fontSize: {
        h1: ["48px", { lineHeight: "58px" }],
        h2: ["40px", { lineHeight: "48px" }],
        h3: ["32px", { lineHeight: "38px" }],
        h4: ["28px", { lineHeight: "34px" }],
        h5: ["24px", { lineHeight: "28px" }],
        s1: ["18px", { lineHeight: "28px" }],
        s2: ["16px", { lineHeight: "24px" }],
        b1: ["16px", { lineHeight: "24px" }],
        b3: ["14px", { lineHeight: "20px" }],
        c1: ["12px", { lineHeight: "16px" }],
        c3: ["10px", { lineHeight: "14px" }],
      },
      zIndex: {
        70: "70",
        80: "80",
        90: "90",
        9999: "9999",
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        dmsans: ['"DM Sans"', "sans-serif"],
        tasa: ['"TASA Orbiter"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
