import withProtect from "../../../libs/middlewares";
import { getDateStd } from "../../../libs/dateFormat";
import { getTkoVozi, getRaspored } from "../../../libs/dataHelpers";

import { connectDb } from "../../../libs/db";

import Day from "../../../models/day.js";

export default withProtect(async (req, res) => {
  let { idem, vozim } = req.query;

  if (!idem && !vozim)
    return res.status(400).json({
      success: false,
      message: "Parameters 'idem' or 'vozim' required."
    });

  console.log("Connecting to DB for /idem endpoint...");
  try {
    await connectDb();

    idem = idem && idem === "true";
    vozim = vozim && vozim === "true";

    //   const action = isChecked
    //     ? { $addToSet: { goes: req.userId } }
    //     : { $pull: { goes: req.userId, drives: req.userId } };

    let action = {};

    // Handle when user goes and/or drives
    if (idem) action = { $addToSet: { goes: req.userId } };
    if (idem && vozim)
      action = { $addToSet: { goes: req.userId, drives: req.userId } };

    // Handle when user doesn's go or drive
    if (vozim === false) action = { $pull: { drives: req.userId } };
    if (idem === false)
      action = { $pull: { goes: req.userId, drives: req.userId } };

    const day = await Day.findOneAndUpdate({ day: getDateStd() }, action, {
      upsert: true,
      new: true
    })
      .select("goes")
      .populate("goes", "name pictures");

    let tkoVozi = [],
      raspored = [];
    if (typeof vozim === "boolean") {
      const res = await Promise.all([getTkoVozi(), getRaspored()]);
      tkoVozi = res[0];
      raspored = res[1];
    }

    return res.json({ success: true, tkoIde: day.goes, tkoVozi, raspored });
  } catch (error) {
    console.warn("An error occurred in /idemvozim endpoint: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
});
