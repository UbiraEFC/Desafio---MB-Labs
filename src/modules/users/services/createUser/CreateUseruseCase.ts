import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../../../../config";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IUserResponseTokenDTO } from "../../dtos/IUserResponseTokenDTO";
import { IUserRepository, UserData } from "../../repositories/IUserRepository";


interface CreateUserRequest {
	name: string;
	description?: string;
	email: string;
	password: string;
	image?: string;
}

export class CreateUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({
		name,
		description,
		email,
		password,
		image
	}: CreateUserRequest): Promise<IUserResponseTokenDTO> {

		try {

			const existEmail = await this.userRepository.findByEmail(email);
			existsOrError(name, 'Name is required!');
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');
			existsOrError(!existEmail, 'Email already exists!');

		} catch (msg) {

			throw new AppError(msg);

		}

		try {
			
			const passwordHash = await hash(password, 8);

			const queryUser: UserData = {
				data: {
					name,
					description,
					email,
					password: passwordHash,
					image,
				}
			}

			const user = await this.userRepository.create(queryUser);

			const token = sign({id: user.id, origin: "USER"}, config.secretKey, {
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

		} catch (msg) {

			throw new AppError(msg);

		}
	}
}