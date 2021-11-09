import withProtect from "../../../libs/middlewares";

import User from "../../../models/user.js";

export default withProtect(async (req, res) => {
  const user = await User.findById(req.userId).select("name pictures.small");
  res.json({ success: true, user });
});
