const scheme = require("./config/constants.js").colorScheme;

module.exports = {
  mode: "jit",
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
      // https://tailwindui.com/documentation
      // fontFamily: {
      //   sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      // },
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
