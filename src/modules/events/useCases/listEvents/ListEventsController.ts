import { Request, Response } from "express";
import { EventRepository } from "../../repositories/EventRepository";
import { ListEventsUseCase } from "./ListEventsUseCase";

export class ListEventsController {
	async list(request: Request, response: Response): Promise<Response> {
		try {

			const eventRepository = new EventRepository();
			const listEventsUseCase = new ListEventsUseCase(eventRepository);

			const eventList = await listEventsUseCase.execute();

			return response.status(201).json({ events: eventList });
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}