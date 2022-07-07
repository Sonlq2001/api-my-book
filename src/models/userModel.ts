import mongoose from "mongoose";

import { IUser } from "../types/modelTypes";

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		mode: {
			type: String,
			default: "light",
		},
		avatar: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>("user", schema);
