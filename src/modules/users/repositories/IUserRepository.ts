import { User } from "@prisma/client";

export interface CreateUserData {
	data: {
		name: string;
		description: string;
		email: string;
		password: string;
		image: string;
	}
}


export interface IUserRepository {
	create(data: CreateUserData): Promise<User>;
	findById(id: string): Promise<User>;
	findMany(): Promise<User[]>;
	delete(id: string): Promise<void>;
	update(id: string): Promise<User>;
}