import { Response, Request, NextFunction } from "express";
import createError from 'http-errors';

import { validateBook } from "../helpers/validation";

export const createBook = (req: Request, res: Response, next: NextFunction) => {
	try {
		const {error} = validateBook(req.body);

		if(error) {
			throw createError(error.details[0].message);
		}

	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
}
