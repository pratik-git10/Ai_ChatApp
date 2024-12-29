import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    min: [6, "email should be minimum 6 char long."],
    max: [50, "email should be max 50 char long."],
  },
  password: {
    type: String,
    select: false,
  },
});

userShema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
userShema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userShema.methods.generateJwt = async function () {
  return jwt.sign({ email: this.email }, process.env.JWT_TOKEN);
};

const User = mongoose.model("user", userShema);
export default User;
