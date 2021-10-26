exports.colorScheme = {
  carbonBlack: "#0B0909",
  carbonEbony: "#44444C",
  carbonGray: "#8C8C8C",
  carbonPewter: "#D6D6D6",
  facebookButton: "#3B5998"
};

exports.appSecret =
  process.env.NODE_ENV === "production"
    ? process.env.FACEBOOK_APP_SECRET
    : process.env.FACEBOOK_APP_SECRET_TEST;
