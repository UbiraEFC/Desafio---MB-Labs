import { Request, Response } from "express";
import { InstitutionRepository } from "../../repositories/InstitutionRepository";
import { CreateInstitutionUseCase } from "./CreateInstitutionUseCase";

export class CreateInstitutionController {
	async signUp(request: Request, response: Response): Promise<Response> {
		try {
			const { name, description, email, password, image } = request.body;

			const institutionRepository = new InstitutionRepository();
			const createInstitutionUseCase = new CreateInstitutionUseCase(institutionRepository);
			const institutionInfo = await createInstitutionUseCase.execute({
				name,
				description,
				email,
				password,
				image
			});

			return response.status(201).json(institutionInfo);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message })
		}
	}
}