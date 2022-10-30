import { Event } from "@prisma/client";

export interface EventData {
	data: {
		title: string;
		description: string;
		institution_id: string;
		speaker: string;
		online: boolean;
		price: string;
		address: string;
		start_date: Date;
		end_date: Date;
		participants: number;
		image: string;
		updated_at?: Date,
	}
}

export interface IEventRepository {
	create(data: EventData): Promise<Event>;
	findById(id: string): Promise<Event>;
	findMany(): Promise<Event[]>;
	delete(id: string): Promise<Event>;
	update(id: string, data: EventData): Promise<Event>;
}