/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        dm: ["DM Sans, sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96", // 240,86,199
        primaryDark: "#58E6D9", // 80,230,217
        bluePrimary: "#2B3674",
        lightSecondary: "#A3AED0",
      },
    },
  },
  plugins: [],
};
