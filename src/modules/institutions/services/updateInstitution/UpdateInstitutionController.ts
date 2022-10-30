import { Request, Response } from "express";
import { PrismaInstitutionRepository } from "../../repositories/prisma/PrismaInstitutionRepository";
import { UpdateInstitutionUseCase } from "./UpdateInstitutionUseCase";

export class UpdateInstitutionController {
	async update(request: Request, response: Response): Promise<Response> {
		const { name, description, email, image } = request.body;
		const { id } = request.origin;

		const prismaInstitutionRepository = new PrismaInstitutionRepository();
		const updateInstitutionUseCase = new UpdateInstitutionUseCase(prismaInstitutionRepository);

		try {

			await updateInstitutionUseCase.execute({
				id, 
				name, 
				description,  
				email,  
				image
			})

			return response.status(202).send();

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}