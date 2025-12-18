/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
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
        "loading": { 
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" }
        },
        "contentup": {
          "100%": { transform: "translateY(0px)", opacity: "1" }
        },
        "contentup2": {
          "100%": { transform: "translateY(0px)", opacity: "1" }
        },
        "contentup3": {
          "100%": { transform: "translateY(0px)", opacity: "1" }
        },
        "pictureshow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "brand": {
          "0%": { fontSize: "5%" },
          "100%": {fontSize: "80%"}
        },
        "bannerOut": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
    },
      animation: {
        "menubar-in": "menubar-in 0.3s ease-in-out forwards",
        "menubar-out": "menubar-out 0.3s ease-in-out forwards",
        "searchbar": "searchbar 0.3s ease-in-out forwards",
        "added-product": "added-product 3s forwards",
        "slider-up": "slider-up 25s linear infinite",
        "slider-down": "slider-down 25s linear infinite",
        "loading": "loading 3s linear infinite",
        "contentup": "contentup 0.5s linear forwards",
        "contentup2": "contentup 0.5s 0.4s linear forwards",
        "contentup3": "contentup 0.5s 0.8s linear forwards",
        "pictureshow": "pictureshow 1s linear forwards",
        "brand1": "brand 0.5s linear forwards",
        "brand2": "brand 0.5s linear forwards",
        "brand3": "brand 0.5s linear forwards",
        "brand4": "brand 0.5s linear forwards",
        "brand5": "brand 0.5s linear forwards",
        "bannerOut": "banner-out 5s ease-in forwards",
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