export const appSecret =
  process.env.NODE_ENV === "production"
    ? process.env.FACEBOOK_APP_SECRET
    : process.env.FACEBOOK_APP_SECRET_TEST;
