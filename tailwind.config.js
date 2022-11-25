/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/*.{html,js}',
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      // fontFamily: { poppins: "Poppins" },
      colors: {
        white: "#fff",
        // gray: {
        //   "100": "rgba(26, 26, 26, 0.68)",
        //   "200": "rgba(26, 26, 26, 0.87)",
        //   "300": "rgba(26, 26, 26, 0.04)",
        // },
        black: "#000",
        gold: "#ffcc00",
      },
    }
  },
  plugins: [],
}
