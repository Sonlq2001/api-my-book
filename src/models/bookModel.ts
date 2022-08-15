import mongoose from "mongoose";

import { IBook } from "../types/modelTypes";

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
      type: Array,
      default: [],
    },
    description: {
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
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("book", schema);
