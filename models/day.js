import mongoose from "mongoose";

import { getDateStd } from "../libs/dateFormat";

const user = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
};

/**
 * {
 * day: YYYY-DD-MM // Current day
 * drives: [5345161436,141631636] // All users (Mongo IDs) who drove on that day
 * goes: [5345161436,141631636] // All users (Mongo IDs) who went on that day
 * }
 */

const daySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      default: getDateStd,
      required: true
    },
    drives: [user],
    goes: [user]
  },
  { timestamps: true }
);

// daySchema.set("toJSON", { getters: true, virtuals: false });

// Next js tends to import models multiple times. To avoid "Cannot overwrite 'user' model once compiled." error, check if model already exists
export default mongoose.models?.Day || mongoose.model("Day", daySchema);
