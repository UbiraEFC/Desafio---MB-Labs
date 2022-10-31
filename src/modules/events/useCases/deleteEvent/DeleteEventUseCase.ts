import { AppError } from "../../../../errors/AppError";
import { DeleteEventRequestDTO } from "../../DTOs/DeleteEventRequestDTO";
import { DeleteEventResponseDTO } from "../../DTOs/DeleteEventResponseDTO";
import { IEventRepository } from "../../interfaces/IEventRepository";

export class DeleteEventUseCase {
	constructor(
		private eventRepository: IEventRepository
	) { }

	async execute({ id, institution_id }: DeleteEventRequestDTO): Promise<DeleteEventResponseDTO> {

		try {
			const event = await this.eventRepository.findById(id);

			if (institution_id !== event.institution_id) {
				throw new AppError("Unauthotized!", 401);
			}

			const eventDeleted = await this.eventRepository.delete(id);

			return { event: { id: eventDeleted.id } }
		} catch (error) {
			if(error.statusCode) throw error;
			throw new AppError(error.message);
		}
	}
}