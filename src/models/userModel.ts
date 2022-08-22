import mongoose from "mongoose";
import bcrypt from "bcrypt";
import createError from "http-errors";

import { IUser } from "../types/modelTypes";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      default: "light",
    },
    avatar: {
      type: String,
    },
    refresh_token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
  } catch (error: any) {
    throw new createError.InternalServerError(error.message);
  }
});

schema.methods.isCheckPassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error: any) {
    throw new createError.InternalServerError(error.message);
  }
};

export default mongoose.model<IUser>("user", schema);
