import { Request, Response } from "express";
import { PrismaEventRepository } from "../../repositories/prisma/PrismaEventRepository";
import { UpdateEventUseCase } from "./UpdateEventUseCase";

export class UpdateEventController {
	async update(request: Request, response: Response): Promise<Response> {
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

		const prismaEventRepository = new PrismaEventRepository();
		const updateEventUseCase = new UpdateEventUseCase(prismaEventRepository);

		try {

			await updateEventUseCase.execute({
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

			return response.status(202).send();

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}