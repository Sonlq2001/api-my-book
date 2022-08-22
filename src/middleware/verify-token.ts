import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";

import { RequestAuth, PayloadToken } from "../types/appTypes";

export const verifyToken = (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return next(new createError.Unauthorized());
    }
    const authHeader = req.headers.authorization;
    const tokenAuth = authHeader.split(" ")[1];

    const payload = <PayloadToken>(
      jwt.verify(tokenAuth, process.env.ACCESS_TOKEN_SECRET as string)
    );
    req.payload = payload;
    next();
  } catch (error: any) {
    return next(new createError.RequestTimeout());
  }
};
