/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        yellow:"#d4a81e",
        darkBlue:"#002147",
        lightBlue:"#095a83",
        contactBlue:"#12385b",
        footerBlue:"#0b1c2c",
      },
      fontFamily:{
        raleway: ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

