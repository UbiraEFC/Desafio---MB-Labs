import { Request, Response } from "express";
import { PrismaInstitutionRepository } from "../../repositories/prisma/PrismaInstitutionRepository";
import { AuthenticateInstitutionUseCase } from "./AuthenticateInstitutionUseCase";

class AuthenticateInstitutionController {
	async signIn(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const prismaInstitutionRepository = new PrismaInstitutionRepository();
		const authenticateInstitutionUsecase = new AuthenticateInstitutionUseCase(prismaInstitutionRepository);

		try {

			const institutionInfo = await authenticateInstitutionUsecase.execute({
				email,
				password,
			});

			return response.status(202).json(institutionInfo);

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}

export { AuthenticateInstitutionController }