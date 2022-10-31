import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { CreateRegistrationRequestDTO } from "../../DTOs/CreateRegistrationRequestDTO";
import { RegistrationDataDTO } from "../../DTOs/RegistrationDataDTO";
import { RegistrationResponseDTO } from "../../DTOs/RegistrationResponseDTO";
import { IRegistrationRepository } from "../../interfaces/IRegistrationRepository";

export class CreateRegistrationUseCase {
	constructor(
		private registrationRepository: IRegistrationRepository
	) { }

	async execute({
		user_id,
		event_id
	}: CreateRegistrationRequestDTO): Promise<RegistrationResponseDTO> {

		try {
			existsOrError(event_id, 'Event Id is required!');

			const queryRegistration: RegistrationDataDTO = {
				data: {
					user_id,
					event_id
				}
			}

			const registrationResponse = await this.registrationRepository.create(queryRegistration);

			return { registration: { id: registrationResponse.id } }
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}