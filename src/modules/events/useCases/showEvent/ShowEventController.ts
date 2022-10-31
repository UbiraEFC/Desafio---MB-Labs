import { Request, Response } from "express";
import { EventRepository } from "../../repositories/EventRepository";
import { ShowEventUseCase } from "./ShowEventUseCase";

export class ShowEventController {
	async showEvent(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;

			const eventRepository = new EventRepository();
			const showEventUseCase = new ShowEventUseCase(eventRepository);
			const event = await showEventUseCase.execute({ id });

			return response.status(200).json({ event });
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}