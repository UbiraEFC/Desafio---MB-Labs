import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { UpdateUserDataDTO } from "../../DTOs/UpdateUserDataDTO";
import { UpdateUserRequestDTO } from "../../DTOs/UpdateUserRequestDTO";
import { UpdateUserResponseDTO } from "../../DTOs/UpdateUserResponseDTO";
import { IUserRepository } from "../../interfaces/IUserRepository";

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
	}: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO> {

		try {
			const user = await this.userRepository.findById(id);

			if (user.email !== email) {
				const existEmail = await this.userRepository.findByEmail(email);
				existsOrError(!existEmail, 'Email already exists!');
			}

			const queryUser: UpdateUserDataDTO = {
				data: {
					name,
					description,
					email,
					image,
					updated_at: new Date(),
				}
			}

			await this.userRepository.update(id, queryUser);

			return { message: "Updated records!" };
		} catch (error) {
			throw new AppError(error);
		}
	}
}