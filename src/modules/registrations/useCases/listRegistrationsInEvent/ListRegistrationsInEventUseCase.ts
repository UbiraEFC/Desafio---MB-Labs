import { UserEvent } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IEventRepository } from "../../../events/interfaces/IEventRepository";
import { ListRegistrationsRequestDTO } from "../../DTOs/ListRegistrationsRequestDTO";
import { IRegistrationRepository } from "../../interfaces/IRegistrationRepository";

export class ListRegistrationsInEventUseCase {
	constructor(
		private registrationsRepository: IRegistrationRepository,
		private eventRepository: IEventRepository
	) { }

	async execute({ event_id }: ListRegistrationsRequestDTO): Promise<UserEvent[]> {
		try {
			const event = await this.eventRepository.findById(event_id);
			existsOrError(event, "Event not found!");

			return await this.registrationsRepository.findUsersRegistrations(event_id);
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}