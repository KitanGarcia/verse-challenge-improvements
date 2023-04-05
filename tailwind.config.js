/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbar: "#F7F6F6",
        "secondary-bg": "#EEF1EE",
        "secondary-text": "#7E7E7E",
        active: "#B2C5D8",
      },
    },
  },
  plugins: [],
};
