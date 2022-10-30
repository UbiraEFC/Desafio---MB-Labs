import { User } from "@prisma/client";

export interface UserData {
	data: {
		name: string;
		description: string;
		email: string;
		password: string;
		image: string;
		updated_at?: Date,
	}
}

export interface IUserRepository {
	create(data: UserData): Promise<User>;
	findById(id: string): Promise<User>;
	findByEmail(email: string): Promise<User>;
	findMany(): Promise<User[]>;
	delete(id: string): Promise<User>;
	update(id: string, data: UserData): Promise<User>;
}