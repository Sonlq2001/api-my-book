import express from "express";

import { login } from "../controllers/authController";

const route = express.Router();

route.get("/login", login);

export default route;
