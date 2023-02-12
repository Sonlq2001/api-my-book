import Joi from "joi";

import { IRequestBodyAuth } from "../types/modelTypes";

export const validateUserRegister = (data: IRequestBodyAuth) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string()
			.email()
			.required()
			.lowercase()
			.pattern(new RegExp("gmail.com$")),
		password: Joi.string().required().min(6).max(32),
	});

	return schema.validate(data);
};

export const validateUserLogin = (data: IRequestBodyAuth) => {
	const schema = Joi.object({
		email: Joi.string()
			.email()
			.required()
			.lowercase()
			.pattern(new RegExp("gmail.com$")),
		password: Joi.string().required().min(6).max(32),
	});

	return schema.validate(data);
};

export const validateBook = (data: any) => {
	// todo validate book
	const schema = Joi.object({
		name: Joi.string().required(),
		price: Joi.number().required(),
	}).options({ stripUnknown: true });

	return schema.validate(data);
};

export const validateInventoryBook = (data: {
	date: string;
	because: string;
}) => {
	const schema = Joi.object({
		date: Joi.string().required(),
		because: Joi.string().required(),
	});

	return schema.validate(data);
};
