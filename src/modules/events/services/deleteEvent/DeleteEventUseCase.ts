import { AppError } from "../../../../errors/AppError";
import { IEventRepository } from "../../repositories/IEventRepository";

interface IDeleteEventRequest {
	id: string;
	institution_id: string;
}

interface IDeleteEventResponse {
	event: {
		id: string;
	}
}

export class DeleteEventUseCase {
	constructor(
		private eventRepository: IEventRepository
	) { }

	async execute({ id, institution_id }: IDeleteEventRequest): Promise<IDeleteEventResponse> {
		
		try {

			const event = await this.eventRepository.findById(id);

			if(institution_id === event.institution_id) {
				const eventDeleted = await this.eventRepository.delete(id);
				return { event: { id: eventDeleted.id } }
			}

			throw new AppError("Unauthotized!", 401);

		} catch (error) {

			throw new AppError(error);

		}
	}
}