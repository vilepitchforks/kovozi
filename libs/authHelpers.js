import Cookies from "cookies";
import jwt from "jsonwebtoken";

import { connectDb } from "./db.js";
import DB from "./db.class.js";

import User from "../models/user.js";

export const checkAuth = (req, res) => {
  const kvuid = req.cookies.kvuid;

  if (!kvuid) return false;

  const cookies = new Cookies(req, res);

  try {
    const decoded = jwt.verify(kvuid, process.env.JWT_SECRET);

    if (decoded) {
      req.userId = decoded.uid;
      return true;
    }

    // If something is wrong with the token, expire kvuid cookie
    cookies.set("kvuid", "");
    return false;
  } catch (err) {
    // If token is expired or any errors occurred, expire kvuid cookie
    cookies.set("kvuid", "");
    return false;
  }
};

export const getAuthUser = async (req, res) => {
  const cookies = new Cookies(req, res);
  if (req.userId) {
    console.log("Connecting to DB to fetch current user data...");
    // await connectDb();

    try {
      // Check if user exists and render the user
      const user = await User.findById(req.userId).select(
        "name pictures approved"
      );

      if (user) return { ...user._doc, _id: user._doc._id.toString() };

      // If user does not exist, redirect to /login
      cookies.set("kvuid", "");
    } catch (error) {
      console.warn("Error fetching user data: ", error);
      cookies.set("kvuid", "");
    }
  }
  return false;
};

export const makeAuthToken = uid =>
  jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: "59d" });
