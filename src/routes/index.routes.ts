import { Router } from "express";

import AuthRoute from "./auth.routes";
import BookRoute from "./book.routes";
import FileRoute from "./file.routes";
import RefreshTokenRoute from "./refresh-token.routes";
import InventoryRoute from "./inventory.routes";

export const routes: Router[] = [
	AuthRoute,
	BookRoute,
	FileRoute,
	RefreshTokenRoute,
	InventoryRoute,
];
