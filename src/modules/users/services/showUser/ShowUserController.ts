import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { ShowUserUseCase } from "./ShowUserUseCase";

export class ShowUserController {
	async showUser(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const prismaUserRepository = new PrismaUserRepository();
		const showUserUseCase = new ShowUserUseCase(prismaUserRepository);

		try {

			const user = await showUserUseCase.execute({ id });

			return response.status(201).json(user);

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}