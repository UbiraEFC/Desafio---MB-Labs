import { UserEvent } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { RegistrationDataDTO } from "../DTOs/RegistrationDataDTO";
import { IRegistrationRepository } from "../interfaces/IRegistrationRepository";


export class RegistrationRepository implements IRegistrationRepository {
	async create(data: RegistrationDataDTO): Promise<UserEvent> {
		return prismaClient.userEvent.create(data);
	}

	async findById(id: string): Promise<UserEvent> {
		return prismaClient.userEvent.findFirst({
			where: { id }
		});
	}

	async findUsersRegistrations(event_id: string): Promise<UserEvent[]> {
		return prismaClient.userEvent.findMany({
			where: { event_id }
		});
	}

	async delete(id: string): Promise<UserEvent> {
		return prismaClient.userEvent.delete({
			where: { id }
		});
	}
}