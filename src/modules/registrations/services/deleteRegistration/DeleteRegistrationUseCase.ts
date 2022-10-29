import { AppError } from "../../../../errors/AppError";
import { IRegistrationResponseDTO } from "../../dtos/IRegistrationResponseDTO";
import { IRegistrationRepository } from "../../repositories/IRegistrationRepository";

interface IDeleteRegistration {
	id: string;
	user_id: string
}

export class DeleteRegistrationUseCase {
	constructor(
		private registrationRepository: IRegistrationRepository
	) { }

	async execute({ id, user_id }: IDeleteRegistration): Promise<IRegistrationResponseDTO> {
		try {

			const registration = await this.registrationRepository.delete(id);

			if (user_id === registration.user_id) return { registration: { id: registration.id } };
			
			throw new AppError("Unauthotized!", 401);

		} catch (error) {
			
			throw new AppError(error);

		}
	}
}