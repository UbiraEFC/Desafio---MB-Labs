import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../../../../config";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { AuthenticateUserRequestDTO } from "../../DTOs/AuthenticateUserRequestDTO";
import { UserResponseTokenDTO } from "../../DTOs/UserResponseTokenDTO";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class AuthenticateUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({ email, password }: AuthenticateUserRequestDTO): Promise<UserResponseTokenDTO> {

		try {
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');

			const user = await this.userRepository.findByEmail(email);
			existsOrError(user, 'Email or password incorrect!', 403);

			const passwordMatch = await compare(password, user.password);
			existsOrError(passwordMatch, 'Email or password incorrect!', 403);

			const token = sign({ id: user.id, origin: "USER" }, config.secretKey, {
				expiresIn: config.expireTime
			});

			const tokenReturn = {
				token,
				user: {
					id: user.id,
					created_at: user.created_at,
					updated_at: user.updated_at,
					last_login: user.last_login
				}
			};
			
			return tokenReturn;
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}