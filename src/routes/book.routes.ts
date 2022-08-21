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

const route = express.Router();

route.post("/book", createBook);

route.get("/books", getBookPendingOrDone);

route.patch("/schedule-book/:id", updateScheduleBook);

route.get("/book/:id", getBook);

route.get("/book-being", getBookBeingRead);

route.patch("/note-book", updateNoteBook);

route.patch("/book-done", updateBookDone);

route.get("/book-check-being", getBookCheckBeing);

export default route;
