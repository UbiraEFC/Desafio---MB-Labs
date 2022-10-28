import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { CreateUserUseCase } from "./CreateUseruseCase";


export class CreateUserController {
	async signUp(request: Request, response: Response): Promise<Response> {
		const { name, description,  email, password, image } = request.body;

		const prismaUserRepository = new PrismaUserRepository();
		const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

		try {

			const userInfo = await createUserUseCase.execute({
				name, 
				description,  
				email, 
				password, 
				image
			});

			return response.status(201).json(userInfo);

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message })
		}
	}
}