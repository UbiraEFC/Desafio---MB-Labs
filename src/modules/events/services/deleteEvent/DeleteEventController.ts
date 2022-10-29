import { Request, Response } from "express";
import { PrismaEventRepository } from "../../repositories/prisma/PrismaEventRepository";
import { DeleteEventUseCase } from "./DeleteEventUseCase";

export class DeleteEventController {
	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { id: institution_id } = request.origin;

		const prismaEventRepository = new PrismaEventRepository();
		const deleteEventUseCase = new DeleteEventUseCase(prismaEventRepository);

		try {

			const event = await deleteEventUseCase.execute({ id, institution_id });
			return response.status(200).json( event );

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}