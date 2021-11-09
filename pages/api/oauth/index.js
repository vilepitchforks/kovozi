import axios from "axios";
import Cookies from "cookies";

import { connectDb } from "../../../libs/db.js";

import User from "../../../models/user.js";

import { hostUrl, facebook } from "../../../config";
import { appSecret } from "../../../config/constants.js";
import { makeAuthToken } from "../../../libs/authHelpers.js";

connectDb();

export default async (req, res) => {
  // For any API calls that are not GET return json response
  if (req.method !== "GET")
    return res
      .status(400)
      .json({ success: false, message: "Only GET requests are allowed." });

  const cookies = new Cookies(req, res);

  // User accepted to grant permissions to name and picture
  if (req.query.code) {
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

      const normalPic = facebook.meUrl
        .replace("{access-token}", tokenData.access_token)
        .replace("{fields}", "picture.type(normal)");

      const largePic = facebook.meUrl
        .replace("{access-token}", tokenData.access_token)
        .replace("{fields}", "picture.type(large)");

      // Get user data with access_token
      const { data: userData } = await axios(meEndpont);

      // Check if user exists in DB
      const existingUser = await User.findOne({ id: userData.id });

      const redirectHome = user => {
        cookies.set("kvuid", makeAuthToken(user._id), {
          maxAge: tokenData.expires_in * 1000
        });

        return res.redirect("/");
      };

      if (existingUser) {
        // Update the access_token in DB for existing user
        existingUser.accessToken = tokenData.access_token;
        existingUser.accessTokenExpires =
          new Date().getTime() + tokenData.expires_in * 1000;

        redirectHome(existingUser);

        existingUser
          .save()
          .then(res => res)
          .catch(console.log);
      } else {
        // If user does not exist in DB, create new user
        const user = new User({
          id: userData.id,
          name: userData.name,
          pictures: {
            small: userData.picture.data
          },
          accessToken: tokenData.access_token,
          accessTokenExpires: new Date().getTime() + tokenData.expires_in * 1000
        });

        redirectHome(user);

        user
          .save()
          .then(async user => {
            // Add normal and large profile picture to user profile
            const [normalPicData, largePicData] = await Promise.all([
              axios(normalPic),
              axios(largePic)
            ]);

            user.pictures.normal = normalPicData.data.picture.data;
            user.pictures.large = largePicData.data.picture.data;

            return user.save().then(res => res);
          })
          .catch(console.log);
      }
    } catch (error) {
      console.warn(`Error in oauth route: `, error.message);
      return res.redirect("/login");
    }
    // User did not grant the permissions
  } else if (req.query.error) {
    const params = new URLSearchParams({
      error: req.query.error,
      error_code: req.query.error_code,
      error_description: req.query.error_description,
      error_reason: req.query.error_reason
    });

    return res.redirect("/login?" + params);
  } else {
    console.warn("Unknown error occurred in oauth route.");
    return res.redirect("/login?error=unknown_error");
  }
};
