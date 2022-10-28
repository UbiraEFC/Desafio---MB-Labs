import { User } from "@prisma/client";

export interface UserData {
	data: {
		name: string;
		description: string;
		email: string;
		password: string;
		image: string;
	}
}

export interface IUserRepository {
	create(data: UserData): Promise<User>;
	findById(id: string): Promise<User>;
	findMany(): Promise<User[]>;
	delete(id: string): Promise<void>;
	update(id: string, data: UserData): Promise<User>;
}