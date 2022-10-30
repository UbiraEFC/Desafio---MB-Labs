import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
	async update(request: Request, response: Response): Promise<Response> {
		const { name, description, email, image } = request.body;
		const { id } = request.origin;

		const prismaUserRepository = new PrismaUserRepository();
		const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository);

		try {

			await updateUserUseCase.execute({
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