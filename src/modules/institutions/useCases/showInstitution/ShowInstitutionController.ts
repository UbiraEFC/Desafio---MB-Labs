import { Request, Response } from "express";
import { InstitutionRepository } from "../../repositories/InstitutionRepository";
import { ShowInstitutionUseCase } from "./ShowInstitutionUseCase";

export class ShowInstitutionController {
	async showInstitution(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;

			const institutionRepository = new InstitutionRepository();
			const showInstitutionUseCase = new ShowInstitutionUseCase(institutionRepository);
			const institution = await showInstitutionUseCase.execute({ id });

			return response.status(201).json(institution);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}