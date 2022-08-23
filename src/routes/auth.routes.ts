import express from "express";

import { login, register, logout } from "../controllers/authController";
import { verifyToken } from "../middleware/verify-token";

const route = express.Router();

route.post("/register", register);

route.post("/login", login);

route.post("/logout", verifyToken, logout);

export default route;
