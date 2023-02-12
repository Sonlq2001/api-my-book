import mongoose from "mongoose";

import { IInventory } from "../types/modelTypes";

const schema = new mongoose.Schema(
	{
		date: {
			type: String || Date,
			required: true,
		},
		because: {
			type: String,
		},
		status: {
			type: Number,
			default: 1,
		},
		require_book: {
			type: Number,
			default: 2,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IInventory>("inventory", schema);
