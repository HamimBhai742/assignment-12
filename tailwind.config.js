/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel"],
        inter: ["Inter"],
        poppins: ["Poppins"],
        lato: ["Lato"]
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

