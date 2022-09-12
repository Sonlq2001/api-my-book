import express, {
	Request,
	Response,
	NextFunction,
	ErrorRequestHandler,
} from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";
import createError from "http-errors";

import db from "./configs/index";
import { routes } from "./routes/index.routes";

const app = express();

// middleware
app.use(
	cors({
		origin: ["http://localhost:8080", "https://api-my-book.herokuapp.com/api"],
		credentials: true,
		preflightContinue: false,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

db.connect();

// Routes
app.use("/api", routes);
app.get("/", (req, res) => {
	res.json({
		message: "Welcome, Books Son has read",
		api: "https://api-my-book.herokuapp.com/api",
	});
});

// handle error
app.use((req: Request, res: Response, next: NextFunction) => {
	next(new createError.NotFound("This route does not exits"));
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	res.status(err.status || 500).json({
		status: err.status || 500,
		message: err.message,
	});
};

app.use(errorHandler);

// server listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server running ${PORT}`);
});
