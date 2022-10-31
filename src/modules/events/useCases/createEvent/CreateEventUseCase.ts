import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { CreateEventRequestDTO } from "../../DTOs/CreateEventRequestDTO";
import { EventDataDTO } from "../../DTOs/EventDataDTO";
import { EventResponseDTO } from "../../DTOs/EventResponseDTO";
import { IEventRepository } from "../../interfaces/IEventRepository";

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
	}: CreateEventRequestDTO): Promise<EventResponseDTO> {

		try {
			existsOrError(title, 'Title is required!');
			existsOrError(price, 'Price is required!');
			existsOrError(address, 'Address is required!');
			existsOrError(start_date, 'Start date is required!');
			existsOrError(end_date, 'End date is required!');

			if (online === undefined) {
				throw new AppError("Online is required!", 400);
			}

			if (!online) existsOrError(participants, "Number of participants is riquered!");

			const queryEvent: EventDataDTO = {
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
			const eventResponse = await this.eventRepository.create(queryEvent);

			const eventReturn: EventResponseDTO = {
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