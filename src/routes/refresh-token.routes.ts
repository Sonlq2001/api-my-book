import express from "express";

import { postRefreshToken } from "../controllers/refreshTokenController";

const route = express.Router();

route.post("/refresh-token", postRefreshToken);

export default route;
