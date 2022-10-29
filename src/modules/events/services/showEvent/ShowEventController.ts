import { Request, Response } from "express";
import { PrismaEventRepository } from "../../repositories/prisma/PrismaEventRepository";
import { ShowEventUseCase } from "./ShowEventUseCase";

export class ShowEventController {
	async showEvent(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const prismaEventRepository = new PrismaEventRepository();
		const showEventUseCase = new ShowEventUseCase(prismaEventRepository);

		try {

			const event = await showEventUseCase.execute({ id });

			return response.status(201).json({ event });

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });
		}
	}
}