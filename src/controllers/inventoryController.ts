import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import Inventory from "../models/inventoryModel";
import { validateInventoryBook } from "../helpers/validation";
import { pagination } from "../helpers/app-helpers";

export const postInventory = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { error } = validateInventoryBook(req.body);
		if (error) {
			throw createError(error.details[0].message);
		}

		const isExistDate = await Inventory.findOne({ date: req.body.date });
		if (isExistDate) {
			throw new createError.BadRequest("Thời gian đã tồn tại");
		}

		const newInventoryBook = new Inventory(req.body);
		newInventoryBook.save();

		return res.status(200).json({ newInventoryBook });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const getInventoryBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { perPage, skip } = pagination(req);
		const listInventory = await Inventory.find()
			.sort({ date: 1 })
			.limit(perPage)
			.skip(skip);

		const total = await Inventory.find().count();

		return res.status(200).json({ list: listInventory, total });
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};
