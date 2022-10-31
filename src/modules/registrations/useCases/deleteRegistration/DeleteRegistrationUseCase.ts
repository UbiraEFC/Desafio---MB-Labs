import { AppError } from "../../../../errors/AppError";
import { DeleteRegistrationDTO } from "../../DTOs/DeleteRegistrationDTO";
import { RegistrationResponseDTO } from "../../DTOs/RegistrationResponseDTO";
import { IRegistrationRepository } from "../../interfaces/IRegistrationRepository";

export class DeleteRegistrationUseCase {
	constructor(
		private registrationRepository: IRegistrationRepository
	) { }

	async execute({ id, user_id }: DeleteRegistrationDTO): Promise<RegistrationResponseDTO> {
		try {
			const registration = await this.registrationRepository.findById(id);

			if (user_id !== registration.user_id) {
				throw new AppError("Unauthotized!", 401);
			}

			const registrationDeleted = await this.registrationRepository.delete(id);

			return { registration: { id: registrationDeleted.id } };
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}