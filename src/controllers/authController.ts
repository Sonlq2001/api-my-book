import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
	try {
		// todo login
	} catch (error: any) {
		return res.status(500).json({ message: error.message });
	}
};
