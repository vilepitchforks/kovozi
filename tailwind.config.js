module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "carbon-black": "#0B0909",
        "carbon-ebony": "#44444C",
        "carbon-gray": "#8C8C8C",
        "carbon-pewter": "#D6D6D6",
        "facebook-button": "#3B5998"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
