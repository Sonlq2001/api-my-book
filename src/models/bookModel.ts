import mongoose from "mongoose";

import { IBook } from "../types/modelTypes";

const childTextNote = new mongoose.Schema(
	{
		note: String,
	},
	{ timestamps: true }
);

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image_book: {
			type: String,
			required: true,
		},
		start_time: {
			type: Date || String,
		},
		end_time: {
			type: Date || String,
		},
		text_notes: {
			type: [childTextNote],
			default: [],
		},
		why_choose: {
			type: String,
		},
		status: {
			type: Number,
			default: 1,
		},
		user_id: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		thinking_after_read: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IBook>("book", schema);
