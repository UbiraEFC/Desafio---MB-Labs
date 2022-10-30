import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IEventRepository, EventData } from "../../repositories/IEventRepository";

interface UpdateEventRequest {
	id: string;
	event_id: string
	title: string;
	description: string;
	speaker: string;
	online: boolean;
	price: string;
	address: string;
	start_date: Date;
	end_date: Date;
	participants: number;
	image: string;
}

export class UpdateEventUseCase {
	constructor(
		private eventRepository: IEventRepository
	) { }

	async execute({
		id,
		event_id,
		title,
		description,
		speaker,
		online,
		price,
		address,
		start_date,
		end_date,
		participants,
		image,
	}: UpdateEventRequest): Promise<void> {

		try {

			const event = await this.eventRepository.findById(event_id);
			if (event.institution_id !== id) {
				existsOrError(!event, 'Unauthorized!');
			}

			const queryEvent: EventData = {
				data: {
					title,
					description,
					institution_id: id,
					speaker,
					online,
					price,
					address,
					start_date: new Date(start_date),
					end_date: new Date(end_date),
					updated_at: new Date(),
					participants,
					image
				}
			}

			await this.eventRepository.update(event_id, queryEvent);

		} catch (error) {

			throw new AppError(error);

		}
	}
}