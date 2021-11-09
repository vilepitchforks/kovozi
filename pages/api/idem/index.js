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

  const isChecked = req.query.checked === "true";

  const action = isChecked
    ? { $addToSet: { goes: req.userId } }
    : { $pull: { goes: req.userId, drives: req.userId } };

  const day = await Day.findOneAndUpdate({ day: getDateStd() }, action, {
    upsert: true,
    new: true
  })
    .select("goes")
    .populate("goes", "name pictures");

  const trenutnoVozi = !isChecked ? await getTrenutnoVozi() : [];

  return res.json({ success: true, tkoIde: day.goes, trenutnoVozi });
});
