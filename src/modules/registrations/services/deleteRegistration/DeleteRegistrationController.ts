import { Request, Response } from "express";
import { PrismaRegistrationRepository } from "../../repositories/prisma/PrismaRegistrationRepository";
import { DeleteRegistrationUseCase } from "./DeleteRegistrationUseCase";

export class DeleteRegistrationController {
	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { id: user_id } = request.origin;

		const prismaRegistrationRepository = new PrismaRegistrationRepository();
		const deleteRegistrationUseCase = new DeleteRegistrationUseCase(prismaRegistrationRepository);

		try {

			const registration = await deleteRegistrationUseCase.execute({ id, user_id });
			return response.status(200).json( registration );

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}