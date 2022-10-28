import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../../../../config";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

interface AuthenticateUserRequest {
	email: string;
	password: string;
}

export class AuthenticateUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) {}

	async execute({ email, password }: AuthenticateUserRequest): Promise<IUserResponseDTO> {

		try {
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');
		} catch (msg) {
			throw new AppError(msg);
		}

		const user = await this.userRepository.findByEmail(email);
		try {
			existsOrError(user, 'Email or password incorrect!');
		} catch (msg) {
			throw new AppError(msg, 401);
		}

		const passwordMatch = await compare(password, user.password);
		try {
			existsOrError(passwordMatch, 'Email or password incorrect!')
		} catch (msg) {
			throw new AppError(msg, 401);
		}

		const token = sign({}, config.secretKey, {
			subject: user.id,
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
		}
		return tokenReturn;
	}
}