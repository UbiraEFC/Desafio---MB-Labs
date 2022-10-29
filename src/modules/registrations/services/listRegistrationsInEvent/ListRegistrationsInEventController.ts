import { Request, Response } from "express";
import { PrismaEventRepository } from "../../../events/repositories/prisma/PrismaEventRepository";
import { PrismaRegistrationRepository } from "../../repositories/prisma/PrismaRegistrationRepository";
import { ListRegistrationsInEventUseCase } from "./ListRegistrationsInEventUseCase";

export class ListRegistrationsInEventController {
	async list(request: Request, response: Response): Promise<Response> {
		const { id: event_id } = request.params;

		const prismaEventRepository = new PrismaEventRepository();
		const prismaRegistrationRepository = new PrismaRegistrationRepository();
		const listRegistrationsInEventUseCase =
		 new ListRegistrationsInEventUseCase(prismaRegistrationRepository, prismaEventRepository);

		try {

			const registrationsList = await listRegistrationsInEventUseCase.execute({ event_id });
			return response.status(200).json({ registrations: registrationsList });

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}