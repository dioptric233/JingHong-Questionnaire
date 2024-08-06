/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}",
    "./src/**/**/*.{vue,ts}",
  ],
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}),
    extend: {},
  },
  plugins: [require('daisyui'),],
}