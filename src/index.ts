import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";

import db from "./configs/index";
import { routes } from "./routes/index.routes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

db.connect();

// Routes
app.use("/api", routes);

// server listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server running ${PORT}`);
});
