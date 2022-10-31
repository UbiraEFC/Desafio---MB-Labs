import { Event } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { IEventRepository } from "../../interfaces/IEventRepository";

export class ListEventsUseCase {
	constructor(
		private eventRepository: IEventRepository
	) { }

	async execute(): Promise<Event[]> {
		try {
			return this.eventRepository.findMany();
		} catch (error) {
			throw new AppError(error);
		}
	}
}