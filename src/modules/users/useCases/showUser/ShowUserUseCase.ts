import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { ShowUserRequestDTO } from "../../DTOs/ShowUserRequestDTO";
import { UserResponseDataDTO } from "../../DTOs/UserResponseDataDTO";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class ShowUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({ id }: ShowUserRequestDTO): Promise<UserResponseDataDTO> {
		try {
			const user = await this.userRepository.findById(id);
			existsOrError(user, "User not found!");
			
			const userResponse = {
				user: {
					name: user.name,
					description: user.description,
					email: user.email,
					image: user.image,
				}
			}

			return userResponse;
		} catch (error) {
			throw new AppError(error);
		}
	}
}