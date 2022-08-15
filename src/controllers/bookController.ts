import { Response, Request, NextFunction } from "express";
import createError from "http-errors";

import { validateBook } from "../helpers/validation";
import Book from "../models/bookModel";

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
    const type = req.query.type;
    const listBook = await Book.find({ status: type });
    return res.status(200).json({ listBook });
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
    const isBeingRead = await Book.findOne({ status: 2 }).count();
    const isAwait = await Book.findOne({
      status: 3,
    }).count();

    if (
      (isBeingRead >= 1 && isAwait >= 1) ||
      (isBeingRead >= 1 && isAwait) ||
      (isAwait >= 1 && isBeingRead)
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
