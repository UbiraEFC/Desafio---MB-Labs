import { UserEvent } from "@prisma/client";

export interface RegistrationData {
	data: {
		user_id: string;
		event_id: string;
	}
}

export interface IRegistrationRepository {
	create(data: RegistrationData): Promise<UserEvent>;
	findById(id: string): Promise<UserEvent>;
	findUsersRegistrations(event_id: string): Promise<UserEvent[]>;
	delete(id: string): Promise<UserEvent>;
}