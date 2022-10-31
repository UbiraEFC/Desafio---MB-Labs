import { UserEvent } from "@prisma/client";
import { RegistrationDataDTO } from "../../DTOs/RegistrationDataDTO";
import { IRegistrationRepository } from "../../interfaces/IRegistrationRepository";

export class RegistrationRepository implements IRegistrationRepository {
	async create(data: RegistrationDataDTO): Promise<UserEvent> {
		return Promise.resolve({
			id: 'string',
			user_id: 'string',
			event_id: 'string',
		});
	}

	async findById(id: string): Promise<UserEvent> {
		return Promise.resolve({
			id: 'string',
			user_id: 'string',
			event_id: 'string',
		});
	}

	async findUsersRegistrations(event_id: string): Promise<UserEvent[]> {
		return Promise.resolve([
			{
				id: 'string',
				user_id: 'string',
				event_id: 'string',
			},
			{
				id: 'string',
				user_id: 'string',
				event_id: 'string',
			}
		]);
	}

	async delete(id: string): Promise<UserEvent> {
		return Promise.resolve({
			id: 'string',
			user_id: 'string',
			event_id: 'string',
		});
	}
}