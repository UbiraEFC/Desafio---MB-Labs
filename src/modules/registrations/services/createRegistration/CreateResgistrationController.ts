import { Request, Response } from "express";
import { PrismaRegistrationRepository } from "../../repositories/prisma/PrismaRegistrationRepository";
import { CreateRegistrationUseCase } from "./createResgistrationUseCase";

export class CreateRegistrationController {
	async create(request: Request, response: Response): Promise<Response> {
		const { event_id } = request.body;

		const { id: user_id } = request.origin;

		const prismaRegistrationRepository = new PrismaRegistrationRepository();
		const createRegistrationUseCase = new CreateRegistrationUseCase(prismaRegistrationRepository);

		try {
			const resgistrationInfo = await createRegistrationUseCase.execute({
				user_id,
				event_id
			});

			return response.status(201).json(resgistrationInfo);

		} catch (error) {
			
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}