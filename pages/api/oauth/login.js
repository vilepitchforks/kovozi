import { hostUrl, facebook } from "../../../config";

const appId =
  process.env.NODE_ENV === "production"
    ? process.env.FACEBOOK_APP_ID
    : process.env.FACEBOOK_APP_ID_TEST;

const oauthUrl = facebook.loginUrl
  .replace("{app-id}", appId)
  .replace("{redirect-uri}", hostUrl + "/api/oauth")
  .replace("{auth-type}", "rerequest");

export default (req, res) => {
  res.redirect(oauthUrl);
};
