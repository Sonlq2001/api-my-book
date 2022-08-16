import express from "express";

import {
  createBook,
  getBookPendingOrDone,
  updateScheduleBook,
  getBook,
  getBookBeingRead,
  updateNoteBook,
  updateBookDone,
} from "../controllers/bookController";

const route = express.Router();

route.post("/book", createBook);

route.get("/books", getBookPendingOrDone);

route.patch("/schedule-book/:id", updateScheduleBook);

route.get("/book/:id", getBook);

route.get("/book-being", getBookBeingRead);

route.patch("/note-book", updateNoteBook);

route.patch("/book-done", updateBookDone);

export default route;
