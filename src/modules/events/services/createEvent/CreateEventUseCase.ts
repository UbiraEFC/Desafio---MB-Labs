import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IEventResponseDTO } from "../../dtos/IEventResponseDTO";
import { EventData, IEventRepository } from "../../repositories/IEventRepository";

interface CreateEventRequest {
	title: string;
	description: string;
	institution_id: string;
	speaker: string;
	online: boolean;
	price: string;
	address: string;
	start_date: Date;
	end_date: Date;
	participants: number;
	image: string;
}

export class CreateEventUseCase {
	constructor(
		private eventRepository: IEventRepository
	) { }

	async execute({
		title,
		description,
		institution_id,
		speaker,
		online,
		price,
		address,
		start_date,
		end_date,
		participants,
		image
	}: CreateEventRequest): Promise<IEventResponseDTO> {

		try {
			existsOrError(title, 'Title is required!');
			existsOrError(price, 'Price is required!');
			existsOrError(address, 'Address is required!');
			existsOrError(start_date, 'Start date is required!');
			existsOrError(end_date, 'End date is required!');
		} catch (msg) {
			throw new AppError(msg);
		}

		if (online == null) {
			throw new AppError("Online is required!");
		}

		try {
			if (!online) existsOrError(participants, "Number of participants is riquered!");
		} catch (msg) {
			throw new AppError(msg);
		}

		const queryEvent: EventData = {
			data: {
				title,
				description,
				institution_id,
				speaker,
				online,
				price,
				address,
				start_date: new Date(start_date),
				end_date: new Date(end_date),
				participants,
				image
			}
		}

		try {
			const eventResponse = await this.eventRepository.create(queryEvent);

			const eventReturn : IEventResponseDTO = {
				event: {
					id: eventResponse.id,
					created_at: eventResponse.created_at,
					updated_at: eventResponse.updated_at,
					start_date: eventResponse.start_date,
					end_date: eventResponse.end_date,
				}
			}

			return eventReturn;
		} catch (msg) {
			throw new AppError(msg);
		}
	}
}