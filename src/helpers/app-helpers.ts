import { Request } from "express";

export const pagination = (req: Request) => {
	const page = Number(req.query.page) || 1;
	const perPage = Number(req.query.per_page) || 5;
	const skip = (page - 1) * perPage;
	return { page, perPage, skip };
};
