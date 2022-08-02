import { Router } from "express";

import AuthRoute from "./auth.routes";
import BookRoute from "./book.routes";

export const routes: Router[] = [AuthRoute, BookRoute];
