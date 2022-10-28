import { Request, Response } from "express";
import { PrismaInstitutionRepository } from "../../repositories/prisma/PrismaInstitutionRepository";
import { CreateInstitutionUseCase } from "./CreateInstitutionUseCase";

export class CreateInstitutionController {
	async signUp(request: Request, response: Response): Promise<Response> {
		const { name, description,  email, password, image } = request.body;

		const prismaInstitutionRepository = new PrismaInstitutionRepository();
		const createInstitutionUseCase = new CreateInstitutionUseCase(prismaInstitutionRepository);

		try {

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