import { Request, Response } from "express";
import { InstitutionRepository } from "../../repositories/InstitutionRepository";
import { DeleteInstitutionUseCase } from "./DeleteInstitutionUseCase";

export class DeleteInstitutionController {
	async delete(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const { id: institution_id } = request.origin;

			const institutionRepository = new InstitutionRepository();
			const deleteInstitutionUseCase = new DeleteInstitutionUseCase(institutionRepository);
			const institution = await deleteInstitutionUseCase.execute({ id, institution_id });

			return response.status(200).json(institution);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}