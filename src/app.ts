import "reflect-metadata";
import "express-async-errors";

import express, { NextFunction, Request, Response }  from "express";
import { router } from "./routes";

export const app = express();

app.use(express.json());

app.use(router);

app.get('/', (request: Request, response: Response)=> {
	return response.json({ message: "Hello World Test" });
});
