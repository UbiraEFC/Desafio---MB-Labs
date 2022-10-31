import { Request, Response } from "express";
import { EventRepository } from "../../../events/repositories/EventRepository";
import { RegistrationRepository } from "../../repositories/RegistrationRepository";
import { ListRegistrationsInEventUseCase } from "./ListRegistrationsInEventUseCase";

export class ListRegistrationsInEventController {
	async list(request: Request, response: Response): Promise<Response> {
		try {
			const { id: event_id } = request.params;

			const eventRepository = new EventRepository();
			const registrationRepository = new RegistrationRepository();
			const listRegistrationsInEventUseCase = new ListRegistrationsInEventUseCase(
				registrationRepository,
				eventRepository
			);

			const registrationsList = await listRegistrationsInEventUseCase.execute({ event_id });

			return response.status(200).json({ registrations: registrationsList });
		} catch (error) {
			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}