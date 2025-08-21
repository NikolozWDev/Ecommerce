/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    extend: {
      keyframes: {
        "menubar-in": {
          "0%": { transform: "translateX(-500px)" },
          "100%": { transform: "translateX(0)" },
        },
        "menubar-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-500px)" },
        },
        "searchbar": {
          "0%": {opacity: '0'},
          "100%": {opacity: '1'}
        },
        "added-product": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "slider-up": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "slider-down": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(50%)" },
        },
      },
      animation: {
        "menubar-in": "menubar-in 0.3s ease-in-out forwards",
        "menubar-out": "menubar-out 0.3s ease-in-out forwards",
        "searchbar": "searchbar 0.3s ease-in-out forwards",
        "added-product": "added-product 3s forwards",
        "slider-up": "slider-up 25s linear infinite",
        "slider-down": "slider-down 25s linear infinite",
      },
      fontFamily: {
        antonio: ["Antonio", "sans-serif"],
        bree: ["Bree Serif", "serif"],
        inter: ["Inter", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        mona: ["Mona Sans", "sans-serif"],
        mozilla: ["Mozilla Headline", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        rubikwet: ["Rubik Wet Paint", "cursive"],
        playwritehu: ["Playwrite HU", "serif"],
        quicksand: ["Quicksand", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
    },
    screens: {
      sm: '480px',
      sm2: '600px',
      md: '778px',
      lg: '976px',
      lg2: '1200px',
      xl: '1440px',
      end: '1500px',
      xl2: '1740px',
    },
  },
  plugins: [],
}