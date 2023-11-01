/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      lgreen: "#eaf2cf",
      mgreen: "#d2e59e",
      dgreen: "#cbd081",
      lgrey: "#b1c1c0",
      dgrey: "#4b5858",
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
