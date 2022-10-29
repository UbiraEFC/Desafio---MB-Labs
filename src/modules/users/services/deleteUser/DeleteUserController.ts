import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { id: user_id } = request.origin;

		const prismaUserRepository = new PrismaUserRepository();
		const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository);

		try {

			const user = await deleteUserUseCase.execute({ id, user_id });
			return response.status(200).json( user );

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}