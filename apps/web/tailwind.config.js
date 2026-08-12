/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hithub: {
          bg: "#0d1117",
          card: "#161b22",
          border: "#30363d",
          accent: "#238636",
          hover: "#2ea043",
        },
      },
    },
  },
  plugins: [],
};
