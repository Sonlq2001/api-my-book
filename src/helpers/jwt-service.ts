import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const signAccessToken = (userId: Types.ObjectId | string) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const options = {
      expiresIn: "30m",
    };
    const secret = process.env.ACCESS_TOKEN_SECRET as string;

    jwt.sign(payload, secret, options, function (err, token) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

export const signRefreshToken = (userId: Types.ObjectId | string) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    const options = {
      expiresIn: "3h",
    };
    const secret = process.env.REFRESH_TOKEN_SECRET as string;

    jwt.sign(payload, secret, options, function (err, token) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
