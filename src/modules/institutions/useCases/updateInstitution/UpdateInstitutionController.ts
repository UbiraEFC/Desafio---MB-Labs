import { Request, Response } from "express";
import { InstitutionRepository } from "../../repositories/InstitutionRepository";
import { UpdateInstitutionUseCase } from "./UpdateInstitutionUseCase";

export class UpdateInstitutionController {
	async update(request: Request, response: Response): Promise<Response> {
		try {
			const { name, description, email, image } = request.body;
			const { id } = request.origin;

			const institutionRepository = new InstitutionRepository();
			const updateInstitutionUseCase = new UpdateInstitutionUseCase(institutionRepository);
			const result = await updateInstitutionUseCase.execute({
				id,
				name,
				description,
				email,
				image
			})

			return response.status(200).json(result);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}