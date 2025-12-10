/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10px)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideIn: "slideIn 0.8s ease-out forwards",
        floatUp: "floatUp 2s ease-in-out infinite alternate",
        scaleIn: "scaleIn 0.5s ease-out forwards",
      },
      
    },
  },
  plugins: [],
};

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
