import { Request, Response } from "express";
import { PrismaEventRepository } from "../../repositories/prisma/PrismaEventRepository";
import { ListEventsUseCase } from "./ListEventsUseCase";

export class ListEventsController {
	async list(request: Request, response: Response): Promise<Response> {
		
		const prismaEventRepository = new PrismaEventRepository();
		const listEventsUseCase = new ListEventsUseCase(prismaEventRepository);

		try {

			const eventList = await listEventsUseCase.execute();

			return response.status(201).json({ events: eventList});

		} catch (error) {

			return response.status(error.status || 500).json({ message: error.message });
		}
	}
}