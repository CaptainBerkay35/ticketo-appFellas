/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#E9EFEC",
        secondary:'#624E88',
      }
    },
  },
  plugins: [],
}

