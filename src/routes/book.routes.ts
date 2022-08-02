import express from "express";
import multer from "multer";
import path from "path";

import { uploadFileDiver } from "../controllers/bookController";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${path.join(__dirname, "../assets/uploads/")}`);
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

const upload = multer({ storage });

const route = express.Router();

route.post("/upload-image", upload.single("file"), uploadFileDiver);

export default route;
