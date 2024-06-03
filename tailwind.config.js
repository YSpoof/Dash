/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "forest"], // false: only light + dark | true: all themes |
    darkTheme: "forest", // name of one of the included themes for dark mode
  },
};
