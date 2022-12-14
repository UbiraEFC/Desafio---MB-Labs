import { User } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { UserDataDTO } from "../DTOs/UserDataDTO";
import { IUserRepository } from "../interfaces/IUserRepository";


export class UserRepository implements IUserRepository {
	async create(data: UserDataDTO): Promise<User> {
		return prismaClient.user.create(data);
	}

	async findById(id: string): Promise<User> {
		const user = await prismaClient.user.findFirst({
			where: {
				id: id
			}
		});

		return user;
	}

	async findByEmail(email: string): Promise<User> {
		return prismaClient.user.findUnique({
			where: { email }
		});


	}

	async findMany(): Promise<User[]> {
		const users = await prismaClient.user.findMany({
			where: { }
		});

		return users;
	}

	async delete(id: string): Promise<User> {
		return prismaClient.user.delete({
			where: { id	}
		});
	}

	async update(id: string, data: UserDataDTO): Promise<User> {
		return prismaClient.user.update({
			where: { id },
			...data
		});
	}
}