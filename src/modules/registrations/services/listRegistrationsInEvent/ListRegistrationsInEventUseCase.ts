import { UserEvent } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IEventRepository } from "../../../events/repositories/IEventRepository";
import { IRegistrationRepository } from "../../repositories/IRegistrationRepository";

interface IListRegistrationsRequest {
	event_id: string;
}

export class ListRegistrationsInEventUseCase {
	constructor(
		private registrationsRepository: IRegistrationRepository,
		private eventRepository: IEventRepository
	) {}

	async execute({ event_id }: IListRegistrationsRequest): Promise<UserEvent[]> {
		try {

			const event = await this.eventRepository.findById(event_id);
			existsOrError(event, "Event not found!");
			return this.registrationsRepository.findUsersRegistrations(event_id);
	
		} catch (error) {

			throw new AppError(error);

		}
	}
}