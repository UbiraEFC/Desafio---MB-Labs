import { Request, Response } from "express";
import { PrismaInstitutionRepository } from "../../repositories/prisma/PrismaInstitutionRepository";
import { ShowInstitutionUseCase } from "./ShowInstitutionUseCase";

export class ShowInstitutionController {
	async showInstitution(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const prismaInstitutionRepository = new PrismaInstitutionRepository();
		const showInstitutionUseCase = new ShowInstitutionUseCase(prismaInstitutionRepository);

		try {

			const institution = await showInstitutionUseCase.execute({ id });

			return response.status(201).json(institution);

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}