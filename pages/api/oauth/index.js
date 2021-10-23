import axios from "axios";
import Cookies from "cookies";

import { connectDb } from "../../../libs/db.js";

import User from "../../../models/user.js";

import { hostUrl, facebook } from "../../../config";
import { appSecret, secure } from "../../../config/constants.js";
import { makeAuthToken } from "../../../libs/authHelpers.js";

connectDb();

export default async (req, res) => {
  // For any API calls that are not GET return json response
  if (req.method !== "GET")
    return res
      .status(400)
      .json({ success: false, message: "Only GET requests are allowed." });

  console.log(`req.protocol: `, req.protocol);

  const cookies = new Cookies(req, res);

  const oauthUrl = facebook.accessTokenUrl
    .replace("{app-id}", facebook.appId)
    .replace("{redirect-uri}", hostUrl + "/api/oauth")
    .replace("{app-secret}", appSecret)
    .replace("{code-parameter}", req.query.code);

  try {
    // Exchange code from oAuth process for access_token
    const { data: tokenData } = await axios(oauthUrl);

    const meEndpont = facebook.meUrl
      .replace("{access-token}", tokenData.access_token)
      .replace("{fields}", "name,picture");

    // Get user data with access_token
    const { data: userData } = await axios(meEndpont);

    // Check if user exists in DB
    const existingUser = await User.findOne({ id: userData.id });

    const redirectHome = user => {
      cookies.set("kvuid", makeAuthToken(user._id), {
        maxAge: tokenData.expires_in * 1000
        // secure
      });

      return res.redirect("/");
    };

    if (existingUser) {
      // Update the access_token in DB for existing user
      existingUser.accessToken = tokenData.access_token;
      existingUser.accessTokenExpires =
        new Date().getTime() + tokenData.expires_in * 1000;

      await existingUser.save();

      redirectHome(existingUser);
    } else {
      // If user does not exist in DB, create new user
      const user = await User.create({
        name: userData.name,
        picture: userData.picture,
        id: userData.id,
        accessToken: tokenData.access_token,
        accessTokenExpires: new Date().getTime() + tokenData.expires_in * 1000
      });

      redirectHome(user);
    }
  } catch (error) {
    console.warn(`Error in oauth route: `, error);
    res.json({ name: "Oauth", response: error });
  }
};
