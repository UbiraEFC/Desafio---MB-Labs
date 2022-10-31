import { Event } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { IEventRepository } from "../../interfaces/IEventRepository";

export class ListEventsUseCase {
	constructor(
		private eventRepository: IEventRepository
	) { }

	async execute(): Promise<Event[]> {
		try {
			return await this.eventRepository.findMany();
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}