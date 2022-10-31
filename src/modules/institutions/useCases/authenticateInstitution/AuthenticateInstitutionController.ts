import { Request, Response } from "express";
import { InstitutionRepository } from "../../repositories/InstitutionRepository";
import { AuthenticateInstitutionUseCase } from "./AuthenticateInstitutionUseCase";

export class AuthenticateInstitutionController {
	async signIn(request: Request, response: Response): Promise<Response> {
		try {
			const { email, password } = request.body;

			const institutionRepository = new InstitutionRepository();
			const authenticateInstitutionUsecase = new AuthenticateInstitutionUseCase(institutionRepository);
			const institutionInfo = await authenticateInstitutionUsecase.execute({
				email,
				password,
			});

			return response.status(200).json(institutionInfo);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}