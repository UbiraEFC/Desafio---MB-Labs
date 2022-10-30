import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IUserRepository, UserData } from "../../repositories/IUserRepository";

interface UpdateUserRequest {
	id: string;
	name: string;
	description?: string;
	email: string;
	password: string;
	image?: string;
}

export class UpdateUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({
		id,
		name,
		description,
		email,
		password,
		image
	}: UpdateUserRequest): Promise<void> {

		try {

			existsOrError(name, 'Name is required!');
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');

			const user = await this.userRepository.findById(id);

			if (user.email !== email) {

				const existEmail = await this.userRepository.findByEmail(email);
				existsOrError(!existEmail, 'Email already exists!');

			}

			const passwordHash = await hash(password, 8);

			const queryUser: UserData = {
				data: {
					name,
					description,
					email,
					password: passwordHash,
					image,
					updated_at: new Date(),
				}
			}

			await this.userRepository.update(id, queryUser);

		} catch (error) {

			throw new AppError(error);

		}
	}
}