import { Request } from "express";

export interface RequestAuth extends Request {
  payload?: PayloadToken;
}

export interface PayloadToken {
  userId: string;
  iat: number;
  exp: number;
}
