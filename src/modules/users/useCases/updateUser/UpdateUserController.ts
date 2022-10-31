import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
	async update(request: Request, response: Response): Promise<Response> {
		try {
			const { name, description, email, image } = request.body;
			const { id } = request.origin;

			const userRepository = new UserRepository();
			const updateUserUseCase = new UpdateUserUseCase(userRepository);
			const result = await updateUserUseCase.execute({
				id,
				name,
				description,
				email,
				image
			})

			return response.status(200).json(result);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}