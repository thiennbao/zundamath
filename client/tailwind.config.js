/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1a1a1a",
        primary: "#42d392",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #42d392 50%, #647eff)",
      },
    },
  },
  plugins: [],
};
