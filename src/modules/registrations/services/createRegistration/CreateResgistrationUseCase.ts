import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IRegistrationResponseDTO } from "../../dtos/IRegistrationResponseDTO";
import { IRegistrationRepository, RegistrationData } from "../../repositories/IRegistrationRepository";

interface ICreateRegistrationRequest {
	user_id: string;
	event_id: string;
}

export class CreateRegistrationUseCase {
	constructor(
		private registrationRepository: IRegistrationRepository
	) { }

	async execute({
		user_id,
		event_id
	}: ICreateRegistrationRequest): Promise<IRegistrationResponseDTO> {

		try {

			existsOrError(event_id, 'Event Id is required!');

			const queryRegistration: RegistrationData = {
				data: {
					user_id,
					event_id
				}
			}

			const registrationResponse = await this.registrationRepository.create(queryRegistration);

			return { registration: { id: registrationResponse.id } }

		} catch (error) {
			throw new AppError(error);
		}
	}
}