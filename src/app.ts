// "scripts": {
// 	"dev": "npm run build:dev",
// 	"start:dev": "ts-node-dev --poll --inspect --transpile-only --ignore-watch node_modules --respawn index.ts",
import "reflect-metadata";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

export const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	return response.status(500).json({
		status: "error",
		message: `Internal server error -> ${err.message}`
	});
});

app.get('/', (request: Request, response: Response) => {
	return response.json({ message: "Hello World" });
});
