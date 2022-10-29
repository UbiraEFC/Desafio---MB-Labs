import { Request, Response } from "express";
import { PrismaInstitutionRepository } from "../../repositories/prisma/PrismaInstitutionRepository";
import { DeleteInstitutionUseCase } from "./DeleteInstitutionUseCase";

export class DeleteInstitutionController {
	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { id: institution_id } = request.origin;

		const prismaInstitutionRepository = new PrismaInstitutionRepository();
		const deleteInstitutionUseCase = new DeleteInstitutionUseCase(prismaInstitutionRepository);

		try {

			const institution = await deleteInstitutionUseCase.execute({ id, institution_id });
			return response.status(200).json( institution );

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}