/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F4B400",
        secondary: "#FFD54F",
        accent: "#C88A00",
        darkText: "#2B2B2B",
        cream: "#FFF8E1",
        beige: "#FDECC8",
      },
    },
  },
  plugins: [],
}