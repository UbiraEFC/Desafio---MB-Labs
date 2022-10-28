import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config";
import { AppError } from "../errors/AppError";
import { existsOrError } from "../errors/ExistsOrError";
import { PrismaUserRepository } from "../modules/users/repositories/prisma/PrismaUserRepository";

interface IPayLoad {
	sub: string;
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
		const { sub: user_id } = verify(
			token,
			config.secretKey
		) as IPayLoad;

		const userRepository = new PrismaUserRepository();
		const user = userRepository.findById(user_id);

		try {
			existsOrError(user, "User does not exists!");
		} catch (msg) {
			throw new AppError(msg, 401);
		}

		request.user = {
			id: user_id
		}

		next();
	} catch {
		throw new AppError("Sessão inválida", 401)
	}
}