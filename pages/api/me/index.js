import { connectDb } from "../../../libs/db";
import withProtect from "../../../libs/middlewares";

import User from "../../../models/user.js";

export default withProtect(async (req, res) => {
  console.log("Connecting to DB for /me endpoint...");
  await connectDb();

  const user = await User.findById(req.userId).select("name pictures.small");
  res.json({ success: true, user });
});
