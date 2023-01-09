/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    colors: {
      white: "#fff",
      pri: {
        "main": "#ffcc00",
        "cont": "#f5c400",
        "adark": "#D4AA00",
      },
      sec: {
        "main": "#1a1a1a",
      },
      'gray': {
        50: '#C4C4C4',
        100: '#F3F4F6',
        150: '#CED4DA',
        200: '#E5E7EB',
        250: '#4F4F4F',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        550: '#828282',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      black: "#000",
      gold: "#ffcc00",
    },
    extend: {
      screens: {
        sm: "480px",
      },
    },
  },
  plugins: [],
};
