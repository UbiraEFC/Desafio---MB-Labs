import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IUserRepository, UpdateUserData } from "../../repositories/IUserRepository";

interface UpdateUserRequest {
	id: string;
	name: string;
	description?: string;
	email: string;
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
		image
	}: UpdateUserRequest): Promise<void> {

		try {

			const user = await this.userRepository.findById(id);

			if (user.email !== email) {

				const existEmail = await this.userRepository.findByEmail(email);
				existsOrError(!existEmail, 'Email already exists!');

			}

			const queryUser: UpdateUserData = {
				data: {
					name,
					description,
					email,
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