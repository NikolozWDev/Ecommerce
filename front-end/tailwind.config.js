/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      sm2: '600px',
      md: '768px',
      lg: '976px',
      lg2: '1200px',
      xl: '1440px',
      end: '1500px',
      xl2: '1740px',
    },
  },
  plugins: [],
}