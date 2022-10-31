import { AppError } from "../../../../errors/AppError";
import { DeleteUserRequestDTO } from "../../DTOs/DeleteUserRequestDTO";
import { DeleteUserResponseDTO } from "../../DTOs/DeleteUserResponseDTO";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class DeleteUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({ id, user_id }: DeleteUserRequestDTO): Promise<DeleteUserResponseDTO> {
		try {
			const user = await this.userRepository.findById(id);

			if(user_id !== user.id) {
				throw new AppError("Unauthotized!", 401);
			}

			const userDeleted = await this.userRepository.delete(id);

			return { user: { id: userDeleted.id } };
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}