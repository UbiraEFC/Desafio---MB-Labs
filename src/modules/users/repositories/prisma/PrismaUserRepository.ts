import { User } from "@prisma/client";
import { prismaClient } from "../../../../database/prismaClient";
import { UserData, IUserRepository } from "../IUserRepository";


export class PrismaUserRepository implements IUserRepository {
	async create(data: UserData): Promise<User> {
		const user = await prismaClient.user.create(data);

		return user;
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

	async delete(id: string): Promise<void> {
		await prismaClient.user.delete({
			where: {
				id: id
			}
		});
	}

	async update(id: string, data: UserData): Promise<User> {
		const user = await prismaClient.user.update({
			where: {
				id: id
			},
			data
		});

		return user;
	}

}