import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  picture: Object,
  id: String,
  accessToken: String,
  accessTokenExpires: Date
});

// Next js tends to import models multiple times. To avoid "Cannot overwrite 'user' model once compiled." error, check if model already exists
export default mongoose.models.user || mongoose.model("user", userSchema);
