import { Response, Request, NextFunction } from "express";
import createError from "http-errors";
import mongoose from "mongoose";

import { validateBook } from "../helpers/validation";
import Book from "../models/bookModel";
import { pagination } from "../helpers/app-helpers";
import { STATUS_BOOK } from "../constants/app-constants";

export const createBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { error } = validateBook(req.body);

		if (error) {
			throw createError(error.details[0].message);
		}

		const newBook = new Book(req.body);
		await newBook.save();
		return res.status(200).json({ newBook });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const getBookPendingOrDone = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { perPage, skip } = pagination(req);
		const { type, sort } = req.query;
		const sorting = sort || "-createdAt";
		const listBook = await Book.find({ status: type })
			.limit(perPage)
			.skip(skip)
			.sort(sorting as string);
		const total = await Book.find({ status: type }).count();

		return res.status(200).json({ listBook, total });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const updateScheduleBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const isBeingReadOrAwait = await Book.findOne({
			status: req.body.status,
		});

		const isStatusBook = isBeingReadOrAwait?.status;
		if (
			isStatusBook === STATUS_BOOK.START ||
			isStatusBook === STATUS_BOOK.AWAIT
		) {
			throw new createError.BadRequest("You still have 1 book waiting to read");
		}

		const bookScheduled = await Book.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		);
		return res.status(200).json({ bookScheduled });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const getBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.params.id) {
			throw new createError.NotFound("Not found id");
		}

		const book = await Book.findOne({ _id: req.params.id });
		return res.status(200).json({ book });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const getBookBeingRead = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (Number(req.query.type) !== 2 && Number(req.query.type) !== 3) {
			throw new createError.InternalServerError("Type not valid");
		}

		const bookBeingRead = await Book.findOne({ status: req.query.type });
		return res.status(200).json({ bookBeingRead });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const updateNoteBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const updatedNote = await Book.findOneAndUpdate(
			{ status: 2 },
			{ $push: { text_notes: req.body } },
			{ new: true }
		);
		return res.status(200).json({ book: updatedNote });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const updateBookDone = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { current_type, desire, ...rest } = req.body;
		const bookDone = await Book.findOneAndUpdate(
			{ status: current_type },
			{ ...rest, status: desire },
			{ new: true }
		);
		return res.status(200).json({ book: bookDone });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const getBookCheckBeing = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const isBookBeing = await Book.findOne({ status: 2 });
		return res.status(200).json({ isBookBeing: Boolean(isBookBeing) });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const getTimeLineBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const bookTimeLine = await Book.findOne({ _id: req.params.id });
		return res.status(200).json({ bookTimeLine });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};
