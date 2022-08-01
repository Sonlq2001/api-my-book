import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { validateUserRegister, validateUserLogin } from "../helpers/validation";
import { signAccessToken, signRefreshToken } from "../helpers/jwt_service";
import User from "../models/userModel";

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, email, password } = req.body;
		const { error } = validateUserRegister({ name, email, password });
		if (error) {
			throw createError(error.details[0].message);
		}

		const isExitsUser = await User.findOne({ email });
		if (isExitsUser) {
			throw new createError.Conflict(`${email} already exist`);
		}

		const user = new User({ name, email, password });

		const resNewUser: any = await user.save();

		return res.status(200).json({
			resNewUser,
		});
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const { error } = validateUserLogin({ email, password });
		if (error) {
			throw createError(error.details[0].message);
		}

		const user = await User.findOne({ email });
		if (!user) {
			throw new createError.NotFound(`${email} does not exist`);
		}

		const isValidPassword = await user.isCheckPassword(password);
		if (!isValidPassword) {
			throw new createError.Unauthorized("Password incorrect ");
		}
		const token = await signAccessToken(user._id);
		const refreshToken = await signRefreshToken(user._id);

		res.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: false,
		});

		res.status(200).json({
			user: { ...user._doc, password: undefined },
			token,
		});
	} catch (error: any) {
		return next(new createError.InternalServerError(error.message));
	}
};
