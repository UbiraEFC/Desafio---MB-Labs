import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { EventDataDTO } from "../../DTOs/EventDataDTO";
import { UpdateEventRequestDTO } from "../../DTOs/UpdateEventRequestDTO";
import { UpdateEventResponseDTO } from "../../DTOs/UpdateEventResponseDTO";
import { IEventRepository } from "../../interfaces/IEventRepository";

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
	}: UpdateEventRequestDTO): Promise<UpdateEventResponseDTO> {

		try {

			const event = await this.eventRepository.findById(event_id);
			existsOrError(event, "Event does not exist!");

			if (event.institution_id !== id) {
				throw new AppError("Unauthorized", 401);
			}

			const queryEvent: EventDataDTO = {
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

			return { message: "Updated records!" };
		} catch (error) {
			throw new AppError(error);
		}
	}
}