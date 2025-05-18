/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}', // muy importante para Angular
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animation-delay'),
  ],
}