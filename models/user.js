import mongoose from "mongoose";

// const childSchema = new Schema({ name: { type: String, required: true } });

const picture = {
  height: Number,
  is_silhouette: Boolean,
  url: String,
  width: Number
};

const userSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    pictures: {
      small: picture,
      normal: picture,
      large: picture
    },
    accessToken: String,
    accessTokenExpires: Date,
    approved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Next js tends to import models multiple times. To avoid "Cannot overwrite 'user' model once compiled." error, check if model already exists
export default mongoose.models.User || mongoose.model("User", userSchema);
