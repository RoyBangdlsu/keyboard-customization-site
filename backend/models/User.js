import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  resetToken: { type: String, default: null },
  resetTokenExpire: { type: Date, default: null }
});

const User = mongoose.model("User", userSchema);

export default User;
