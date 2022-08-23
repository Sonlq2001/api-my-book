import express from "express";

import {
  createBook,
  getBookPendingOrDone,
  updateScheduleBook,
  getBook,
  getBookBeingRead,
  updateNoteBook,
  updateBookDone,
  getBookCheckBeing,
} from "../controllers/bookController";
import { verifyToken } from "../middleware/verify-token";

const route = express.Router();

route.post("/book", verifyToken, createBook);

route.get("/books", verifyToken, getBookPendingOrDone);

route.patch("/schedule-book/:id", verifyToken, updateScheduleBook);

route.get("/book/:id", verifyToken, getBook);

route.get("/book-being", verifyToken, getBookBeingRead);

route.patch("/note-book", verifyToken, updateNoteBook);

route.patch("/book-done", verifyToken, updateBookDone);

route.get("/book-check-being", verifyToken, getBookCheckBeing);

export default route;
