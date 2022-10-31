import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
	async signUp(request: Request, response: Response): Promise<Response> {
		try {
			const { name, description, email, password, image } = request.body;

			const userRepository = new UserRepository();
			const createUserUseCase = new CreateUserUseCase(userRepository);
			const userInfo = await createUserUseCase.execute({
				name,
				description,
				email,
				password,
				image
			});

			return response.status(201).json(userInfo);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}