import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository";
import { ShowUserUseCase } from "./ShowUserUseCase";

export class ShowUserController {
	async showUser(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;

			const userRepository = new UserRepository();
			const showUserUseCase = new ShowUserUseCase(userRepository);
			const user = await showUserUseCase.execute({ id });

			return response.status(200).json(user);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}