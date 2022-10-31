import { Request, Response } from "express";
import { EventRepository } from "../../repositories/EventRepository";
import { DeleteEventUseCase } from "./DeleteEventUseCase";

export class DeleteEventController {
	async delete(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const { id: institution_id } = request.origin;

			const eventRepository = new EventRepository();
			const deleteEventUseCase = new DeleteEventUseCase(eventRepository);
			const event = await deleteEventUseCase.execute({ id, institution_id });

			return response.status(200).json(event);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}