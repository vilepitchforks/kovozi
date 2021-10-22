import axios from "axios";
import { hostUrl, facebook } from "../../../config";

export default async (req, res) => {
  const oauthUrl = facebook.accessTokenUrl
    .replace("{app-id}", process.env.FACEBOOK_APP_ID)
    .replace("{redirect-uri}", hostUrl + "/api/oauth")
    .replace("{app-secret}", process.env.FACEBOOK_APP_SECRET)
    .replace("{code-parameter}", req.query.code);

  try {
    const { data } = await axios(oauthUrl);

    const meEndpont = facebook.meUrl
      .replace("{access-token}", data.access_token)
      .replace("{fields}", "name,picture");

    const result = await axios(meEndpont);

    res.json({ name: "Oauth", response: result.data });
  } catch (error) {
    res.json({ name: "Oauth", response: error });
  }
};
