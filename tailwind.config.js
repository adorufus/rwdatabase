/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js","./node_modules/flowbite-datepicker/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite'),
    require('daisyui')
  ],
}

