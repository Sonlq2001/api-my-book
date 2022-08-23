import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";

import User from "../models/userModel";
import { PayloadToken } from "../types/appTypes";
import { signAccessToken, signRefreshToken } from "../helpers/jwt-service";

export const postRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshTokenCookie = req.cookies.refresh_token;
    if (!refreshTokenCookie) {
      return next(new createError.Unauthorized());
    }

    const payloadToken = <PayloadToken>(
      jwt.verify(refreshTokenCookie, process.env.REFRESH_TOKEN_SECRET as string)
    );

    const userLogged = await User.findOne({
      _id: payloadToken.userId,
    }).select("refresh_token");

    if (!userLogged) {
      return next(new createError.Unauthorized());
    }

    if (refreshTokenCookie !== userLogged.refresh_token) {
      return next(new createError.Unauthorized());
    }

    const accessToken = await signAccessToken(userLogged._id);
    const refreshToken = await signRefreshToken(userLogged._id);

    await User.updateOne(
      { _id: userLogged._id },
      { refresh_token: refreshToken }
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return res.status(200).json({ accessToken });
  } catch (error: any) {
    return next(
      new createError.Unauthorized("Your login session has expired !")
    );
  }
};
