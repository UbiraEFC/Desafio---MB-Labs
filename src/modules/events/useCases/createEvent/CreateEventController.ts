import { Request, Response } from "express";
import { EventRepository } from "../../repositories/EventRepository";
import { CreateEventUseCase } from "./CreateEventUseCase";

export class CreateEventController {
	async create(request: Request, response: Response): Promise<Response> {
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

			const { id: institution_id } = request.origin;

			const eventRepository = new EventRepository();
			const createEventUseCase = new CreateEventUseCase(eventRepository);

			const eventInfo = await createEventUseCase.execute({
				title,
				institution_id,
				description,
				speaker,
				online,
				price,
				address,
				start_date,
				end_date,
				participants,
				image
			});

			return response.status(201).json(eventInfo);

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}