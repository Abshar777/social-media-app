import mongoose, { Document, Schema } from "mongoose";
import UserModel from "../types/userType";
import bcrypt from "bcryptjs";
import userType from "../types/userType";

interface UserDocument extends userType,Document {}

const userSchema: Schema<UserDocument> = new Schema({
  name: {
    type: String,
    required: [true , "name must be required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    macth: [/.+\@.+\..+/, "please use valid email"],
    
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
  },
  isAdmin: {
    default: false,
    type: Boolean,
    required: true,
  },
});

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model("User", userSchema);
