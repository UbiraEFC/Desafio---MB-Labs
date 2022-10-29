import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IUserResponseDataDTO } from "../../dtos/IUserResponseDataDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IShowUserRequest {
	id: string;
}

export class ShowUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({ id }: IShowUserRequest): Promise<IUserResponseDataDTO> {
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