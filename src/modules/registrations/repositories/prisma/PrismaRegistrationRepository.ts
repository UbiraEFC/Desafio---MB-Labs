import { UserEvent } from "@prisma/client";
import { prismaClient } from "../../../../database/prismaClient";
import { IRegistrationRepository, RegistrationData } from "../IRegistrationRepository";


export class PrismaRegistrationRepository implements IRegistrationRepository {
	async create(data: RegistrationData): Promise<UserEvent> {
		return prismaClient.userEvent.create(data);
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