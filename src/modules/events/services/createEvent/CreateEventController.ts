import { Request, Response } from "express";
import { PrismaEventRepository } from "../../repositories/prisma/PrismaEventRepository";
import { CreateEventUseCase } from "./CreateEventUseCase";

export class CreateEventController {
	async create(request: Request, response: Response): Promise<Response> {
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

		const { id: institution_id } = request.user;


		const prismaEventRepository = new PrismaEventRepository();
		const createEventUseCase = new CreateEventUseCase(prismaEventRepository);

		try {

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

			return response.status(error.statusCode).json({ message: error.message })
		}
	}
}