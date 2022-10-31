import { Request, Response } from "express";
import { UserRepository } from "../../repositories/UserRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
	async signIn(request: Request, response: Response): Promise<Response> {
		try {
			const { email, password } = request.body;

			const userRepository = new UserRepository();
			const authenticateUserUsecase = new AuthenticateUserUseCase(userRepository);
			const userInfo = await authenticateUserUsecase.execute({
				email,
				password,
			});

			return response.status(202).json(userInfo);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}