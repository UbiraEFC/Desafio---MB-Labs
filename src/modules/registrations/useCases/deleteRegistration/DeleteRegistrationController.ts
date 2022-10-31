import { Request, Response } from "express";
import { RegistrationRepository } from "../../repositories/RegistrationRepository";
import { DeleteRegistrationUseCase } from "./DeleteRegistrationUseCase";

export class DeleteRegistrationController {
	async delete(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const { id: user_id } = request.origin;

			const registrationRepository = new RegistrationRepository();
			const deleteRegistrationUseCase = new DeleteRegistrationUseCase(registrationRepository);
			const registration = await deleteRegistrationUseCase.execute({ id, user_id });

			return response.status(200).json(registration);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}