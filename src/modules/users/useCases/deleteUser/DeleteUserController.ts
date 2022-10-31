import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
	async delete(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const { id: user_id } = request.origin;

			const userRepository = new UserRepository();
			const deleteUserUseCase = new DeleteUserUseCase(userRepository);
			const user = await deleteUserUseCase.execute({ id, user_id });

			return response.status(200).json(user);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}