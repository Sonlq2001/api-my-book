import express from "express";

import { createBook } from "../controllers/bookController";

const route = express.Router();

route.post("/book", createBook);

export default route;
