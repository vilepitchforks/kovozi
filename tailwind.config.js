const scheme = require("./config/constants.js").colorScheme;

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "carbon-black": scheme.carbonBlack,
        "carbon-ebony": scheme.carbonEbony,
        "carbon-gray": scheme.carbonGray,
        "carbon-pewter": scheme.carbonPewter,
        "facebook-button": scheme.facebookButton
      },
      fontSize: {
        tiny: ".625rem"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
