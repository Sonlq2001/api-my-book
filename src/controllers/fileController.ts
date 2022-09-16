import { Response, Request, NextFunction } from "express";
import fs from "fs";
import createError from "http-errors";
import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

const removeFileUpload = (path: string) => {
	fs.unlink(path, (err) => {
		if (err) throw err;
	});
};

export const uploadFileCloudinary = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.file) {
			return next(new createError.NotFound("File does not exist"));
		}
		const resCloudinary = await cloudinary.v2.uploader.upload(req.file.path, {
			folder: "my-book",
		});
		removeFileUpload(req.file.path);
		return res.status(200).json({
			public_id: resCloudinary.public_id,
			url: resCloudinary.secure_url,
		});
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};
