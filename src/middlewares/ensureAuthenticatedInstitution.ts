import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config";
import { AppError } from "../errors/AppError";
import { existsOrError } from "../errors/ExistsOrError";
import { PrismaInstitutionRepository } from "../modules/institutions/repositories/prisma/PrismaInstitutionRepository";

interface IPayLoad {
	id: string;
}

export async function ensureAuthenticatedInstitution(request: Request, response: Response, next: NextFunction) {

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

		const institutionRepository = new PrismaInstitutionRepository();
		const institution = await institutionRepository.findById(id);
		existsOrError(institution, "");
		request.origin = { id };
		return next();

	} catch {
		throw new AppError("Sessão inválida", 401)
	}
}