import { Event } from "@prisma/client";

export interface CreateEventData {
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
		participants: Number;
		image: string;
	}
}


export interface IEventRepository {
	create(data: CreateEventData): Promise<Event>;
	findById(id: string): Promise<Event>;
	findMany(): Promise<Event[]>;
	delete(id: string): Promise<void>;
	update(id: string): Promise<Event>;
}