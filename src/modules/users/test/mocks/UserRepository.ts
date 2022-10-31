import { User } from "@prisma/client";
import { UpdateUserDataDTO } from "../../DTOs/UpdateUserDataDTO";
import { UserDataDTO } from "../../DTOs/UserDataDTO";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
	async create(data: UserDataDTO): Promise<User> {
		return Promise.resolve({
			id: "string",
			name: "string",
			description: "string",
			email: "string",
			password: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			last_login: new Date("2001-01-01"),
			image: "string",
		});
	}

	async findById(id: string): Promise<User> {
		return Promise.resolve({
			id: "string",
			name: "string",
			description: "string",
			email: "string",
			password: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			last_login: new Date("2001-01-01"),
			image: "string",
		});
	}

	async findByEmail(email: string): Promise<User> {
		return Promise.resolve({
			id: "string",
			name: "string",
			description: "string",
			email: "string",
			password: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			last_login: new Date("2001-01-01"),
			image: "string",
		});
	}

	async findMany(): Promise<User[]> {
		return Promise.resolve([
			{
				id: "string",
				name: "string",
				description: "string",
				email: "string",
				password: "string",
				created_at: new Date("2001-01-01"),
				updated_at: new Date("2001-01-01"),
				last_login: new Date("2001-01-01"),
				image: "string",
			},
			{
				id: "string",
				name: "string",
				description: "string",
				email: "string",
				password: "string",
				created_at: new Date("2001-01-01"),
				updated_at: new Date("2001-01-01"),
				last_login: new Date("2001-01-01"),
				image: "string",
			}
		]);
	}

	async delete(id: string): Promise<User> {
		return Promise.resolve({
			id: "string",
			name: "string",
			description: "string",
			email: "string",
			password: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			last_login: new Date("2001-01-01"),
			image: "string",
		});
	}

	async update(id: string, data: UpdateUserDataDTO): Promise<User> {
		return Promise.resolve({
			id: "string",
			name: "string",
			description: "string",
			email: "string",
			password: "string",
			created_at: new Date("2001-01-01"),
			updated_at: new Date("2001-01-01"),
			last_login: new Date("2001-01-01"),
			image: "string",
		});
	}
}