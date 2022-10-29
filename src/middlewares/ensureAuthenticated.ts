import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config";
import { AppError } from "../errors/AppError";
import { existsOrError } from "../errors/ExistsOrError";

interface IPayLoad {
	id: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

	const authHeader = request.headers.authorization;

	try {
		existsOrError(authHeader, "Token missing");
	} catch (msg) {
		throw new AppError(msg, 401);
	}

	const [, token] = authHeader.split(" ");

	try {
		const { id } = verify(
			token,
			config.secretKey
		) as IPayLoad;

		request.origin = {id};

		return next();

	} catch {
		throw new AppError("Sessão inválida", 401)
	}
}