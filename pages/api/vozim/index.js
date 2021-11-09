import withProtect from "../../../libs/middlewares";
import { getDateStd } from "../../../libs/dateFormat";
import { getTrenutnoVozi } from "../../../libs/dataHelpers";

import Day from "../../../models/day.js";

export default withProtect(async (req, res) => {
  if (!req.query.checked)
    return res.status(400).json({
      success: false,
      message: "Missing parameter: 'checked'."
    });

  // req.userId
  const action =
    req.query.checked === "true"
      ? { $addToSet: { drives: req.userId } }
      : { $pull: { drives: req.userId } };

  const day = await Day.findOneAndUpdate({ day: getDateStd() }, action, {
    upsert: true,
    new: true
  });

  const trenutnoVozi = await getTrenutnoVozi();

  return res.json({ success: true, trenutnoVozi });
});
