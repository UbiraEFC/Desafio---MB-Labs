import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IDeleteUserResponse {
	user: {
		id: string;
	}
}

interface IDeleteUserRequest {
	id: string;
	user_id: string
}

export class DeleteUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({ id, user_id }: IDeleteUserRequest): Promise<IDeleteUserResponse> {
		try {

			const user = await this.userRepository.findById(id);

			if(user_id === user.id) {
				const userDeleted = await this.userRepository.delete(id);
				return { user: { id: userDeleted.id } }
			}
			
			throw new AppError("Unauthotized!", 401);

		} catch (error) {
			
			throw new AppError(error);

		}
	}
}