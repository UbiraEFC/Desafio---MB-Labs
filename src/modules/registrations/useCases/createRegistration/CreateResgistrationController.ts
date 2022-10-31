import { Request, Response } from "express";
import { RegistrationRepository } from "../../repositories/RegistrationRepository";
import { CreateRegistrationUseCase } from "./CreateResgistrationUseCase";

export class CreateRegistrationController {
	async create(request: Request, response: Response): Promise<Response> {
		try {
			const { event_id } = request.body;
			const { id: user_id } = request.origin;

			const registrationRepository = new RegistrationRepository();
			const createRegistrationUseCase = new CreateRegistrationUseCase(registrationRepository);
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