const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}