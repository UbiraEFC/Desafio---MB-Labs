import { Event } from "@prisma/client";
import { prismaClient } from "../../../../database/prismaClient";
import { EventData, IEventRepository } from "../IEventRepository";


export class PrismaEventRepository implements IEventRepository {
	async create(data: EventData): Promise<Event> {
		return prismaClient.event.create(data);
	}

	async findById(id: string): Promise<Event> {
		return prismaClient.event.findFirst({
			where: { id }
		});
	}

	async findMany(): Promise<Event[]> {
		return prismaClient.event.findMany({
			where: { }
		});
	}

	async delete(id: string): Promise<Event> {
		return prismaClient.event.delete({
			where: { id	}
		});
	}

	async update(id: string, data: EventData): Promise<Event> {
		return prismaClient.event.update({
			where: { id },
			...data
		});
	}
}