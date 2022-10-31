import { Event } from "@prisma/client";
import { EventDataDTO } from "../../DTOs/EventDataDTO";
import { IEventRepository } from "../../interfaces/IEventRepository";

export class EventRepository implements IEventRepository {
	async create(data: EventDataDTO): Promise<Event> {
		return Promise.resolve({
			id: "string",
			title: "string",
			description: "string",
			institution_id: "string",
			speaker: "string",
			participants: 10,
			address: "string",
			price: "string",
			online: true,
			image: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			start_date: new Date("2001-01-01"),
			end_date: new Date("2001-01-01"),
		});
	}

	async findById(id: string): Promise<Event> {
		return Promise.resolve({
			id: "string",
			title: "string",
			description: "string",
			institution_id: "string",
			speaker: "string",
			participants: 10,
			address: "string",
			price: "string",
			online: true,
			image: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			start_date: new Date("2001-01-01"),
			end_date: new Date("2001-01-01"),
		});
	}

	async findMany(): Promise<Event[]> {
		return Promise.resolve([
			{
				id: "string",
				title: "string",
				description: "string",
				institution_id: "string",
				speaker: "string",
				participants: 10,
				address: "string",
				price: "string",
				online: true,
				image: "string",
				created_at: new Date("2001-01-01"),
				updated_at: new Date("2001-01-01"),
				start_date: new Date("2001-01-01"),
				end_date: new Date("2001-01-01"),
			},
			{
				id: "string",
				title: "string",
				description: "string",
				institution_id: "string",
				speaker: "string",
				participants: 10,
				address: "string",
				price: "string",
				online: true,
				image: "string",
				created_at: new Date("2001-01-01"),
				updated_at: new Date("2001-01-01"),
				start_date: new Date("2001-01-01"),
				end_date: new Date("2001-01-01"),
			}
		]);
	}

	async delete(id: string): Promise<Event> {
		return Promise.resolve({
			id: "string",
			title: "string",
			description: "string",
			institution_id: "string",
			speaker: "string",
			participants: 10,
			address: "string",
			price: "string",
			online: true,
			image: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			start_date: new Date("2001-01-01"),
			end_date: new Date("2001-01-01"),
		});
	}

	async update(id: string, data: EventDataDTO): Promise<Event> {
		return Promise.resolve({
			id: "string",
			title: "string",
			description: "string",
			institution_id: "string",
			speaker: "string",
			participants: 10,
			address: "string",
			price: "string",
			online: true,
			image: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			start_date: new Date("2001-01-01"),
			end_date: new Date("2001-01-01"),
		});
	}
}