import { Event } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { ShowEventRequestDTO } from "../../DTOs/ShowEventRequestDTO";
import { IEventRepository } from "../../interfaces/IEventRepository";

export class ShowEventUseCase {
	constructor(
		private eventRepository: IEventRepository
	) { }

	async execute({ id }: ShowEventRequestDTO): Promise<Event> {
		try {
			const event = await this.eventRepository.findById(id);
			existsOrError(event, "Event not found!");
			return event;
		} catch (error) {
			throw new AppError(error);
		}
	}
}