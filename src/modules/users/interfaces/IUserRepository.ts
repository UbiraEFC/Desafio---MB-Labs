import { User } from "@prisma/client";
import { UpdateUserDataDTO } from "../DTOs/UpdateUserDataDTO";
import { UserDataDTO } from "../DTOs/UserDataDTO";

export interface IUserRepository {
	create(data: UserDataDTO): Promise<User>;
	findById(id: string): Promise<User>;
	findByEmail(email: string): Promise<User>;
	findMany(): Promise<User[]>;
	delete(id: string): Promise<User>;
	update(id: string, data: UpdateUserDataDTO): Promise<User>;
}