import { hostUrl, facebook } from "../../../config";

const oauthUrl = facebook.loginUrl
  .replace("{app-id}", process.env.FACEBOOK_APP_ID)
  .replace("{redirect-uri}", hostUrl + "/api/oauth");
// .replace("{auth-type}", "rerequest");

export default (req, res) => {
  res.redirect(oauthUrl);
};
