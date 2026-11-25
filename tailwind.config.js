/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4B3BF0",
        "primary-dark": "#2F22B8",
        "primary-soft": "#ECEAFF",
        accent: "#D7F75B",
        bg: "#F4F3EF",
        ink: "#15132B",
        muted: "#5E5B72",
        line: "#E6E4DD",
      },
    },
  },
  plugins: [],
};
