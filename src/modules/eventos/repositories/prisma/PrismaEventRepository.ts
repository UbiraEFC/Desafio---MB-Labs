import { Event } from "@prisma/client";
import { prismaClient } from "../../../../database/prismaClient";
import { EventData, IEventRepository } from "../IEventRepository";


export class PrismaEventRepository implements IEventRepository {
	async create(data: EventData): Promise<Event> {
		const event = await prismaClient.event.create(data);

		return event;
	}

	async findById(id: string): Promise<Event> {
		const event = await prismaClient.event.findFirst({
			where: {
				id: id
			}
		});

		return event;
	}

	async findMany(): Promise<Event[]> {
		const events = await prismaClient.event.findMany({
			where: { }
		});

		return events;
	}

	async delete(id: string): Promise<void> {
		await prismaClient.event.delete({
			where: {
				id: id
			}
		});
	}

	async update(id: string, data: EventData): Promise<Event> {
		const event = await prismaClient.event.update({
			where: {
				id: id
			},
			data
		});

		return event;
	}
}