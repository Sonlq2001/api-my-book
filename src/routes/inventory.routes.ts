import express from "express";

import {
	postInventory,
	getInventoryBook,
} from "../controllers/inventoryController";

const route = express.Router();

route.post("/create-inventory", postInventory);

route.get("/inventory", getInventoryBook);

export default route;
