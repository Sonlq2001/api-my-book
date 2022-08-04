import { Router } from "express";

import AuthRoute from "./auth.routes";
import BookRoute from "./book.routes";
import FileRoute from "./file.routes";

export const routes: Router[] = [AuthRoute, BookRoute, FileRoute];
