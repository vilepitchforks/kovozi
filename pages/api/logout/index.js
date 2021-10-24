import Cookies from "cookies";

import withProtect from "../../../libs/middlewares";

export default withProtect((req, res) => {
  const cookies = new Cookies(req, res);

  cookies.set("kvuid", "");
  res.redirect("/login");
});
