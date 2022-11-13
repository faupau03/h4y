const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '294px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
}