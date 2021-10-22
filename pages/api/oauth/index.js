import axios from "axios";
import { hostUrl, facebook } from "../../../config";

const appId =
  process.env.NODE_ENV === "production"
    ? process.env.FACEBOOK_APP_ID
    : process.env.FACEBOOK_APP_ID_TEST;

const appSecret =
  process.env.NODE_ENV === "production"
    ? process.env.FACEBOOK_APP_SECRET
    : process.env.FACEBOOK_APP_SECRET_TEST;

export default async (req, res) => {
  const oauthUrl = facebook.accessTokenUrl
    .replace("{app-id}", appId)
    .replace("{redirect-uri}", hostUrl + "/api/oauth")
    .replace("{app-secret}", appSecret)
    .replace("{code-parameter}", req.query.code);

  try {
    const { data } = await axios(oauthUrl);

    const meEndpont = facebook.meUrl
      .replace("{access-token}", data.access_token)
      .replace("{fields}", "name,picture");

    const result = await axios(meEndpont);
    console.log(`From meEndpoint api call result.data:`, result.data);
    res.json({ name: "Oauth", response: result.data });
  } catch (error) {
    res.json({ name: "Oauth", response: error });
  }
};
