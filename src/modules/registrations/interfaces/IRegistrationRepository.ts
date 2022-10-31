import { UserEvent } from "@prisma/client";
import { RegistrationDataDTO } from "../DTOs/RegistrationDataDTO";

export interface IRegistrationRepository {
	create(data: RegistrationDataDTO): Promise<UserEvent>;
	findById(id: string): Promise<UserEvent>;
	findUsersRegistrations(event_id: string): Promise<UserEvent[]>;
	delete(id: string): Promise<UserEvent>;
}