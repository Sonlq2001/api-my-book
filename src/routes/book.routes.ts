import express from "express";

import {
  createBook,
  getBookPendingOrDone,
  updateScheduleBook,
  getBook,
  getBookBeingRead,
} from "../controllers/bookController";

const route = express.Router();

route.post("/book", createBook);

route.get("/books", getBookPendingOrDone);

route.patch("/schedule-book/:id", updateScheduleBook);

route.get("/book/:id", getBook);

route.get("/book-being", getBookBeingRead);

export default route;
