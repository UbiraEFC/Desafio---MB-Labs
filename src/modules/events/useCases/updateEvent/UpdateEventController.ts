import { Request, Response } from "express";
import { EventRepository } from "../../repositories/EventRepository";
import { UpdateEventUseCase } from "./UpdateEventUseCase";

export class UpdateEventController {
	async update(request: Request, response: Response): Promise<Response> {
		try {
			const {
				title,
				description,
				speaker,
				online,
				price,
				address,
				start_date,
				end_date,
				participants,
				image
			} = request.body;
			const { id } = request.origin;
			const { id: event_id } = request.params;

			const eventRepository = new EventRepository();
			const updateEventUseCase = new UpdateEventUseCase(eventRepository);
			const result = await updateEventUseCase.execute({
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
				image
			})

			return response.status(200).json(result);
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}