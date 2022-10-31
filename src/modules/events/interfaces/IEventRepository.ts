import { Event } from "@prisma/client";
import { EventDataDTO } from "../DTOs/EventDataDTO";

export interface IEventRepository {
	create(data: EventDataDTO): Promise<Event>;
	findById(id: string): Promise<Event>;
	findMany(): Promise<Event[]>;
	delete(id: string): Promise<Event>;
	update(id: string, data: EventDataDTO): Promise<Event>;
}