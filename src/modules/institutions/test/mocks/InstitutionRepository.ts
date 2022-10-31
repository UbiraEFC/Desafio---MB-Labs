import { Institution } from "@prisma/client";
import { InstitutionDataDTO } from "../../DTOs/InstitutionDataDTO";
import { UpdateInstitutionDataDTO } from "../../DTOs/UpdateInstitutionDataDTO";
import { IInstitutionRepository } from "../../interfaces/IInstitutionRepository";

export class InstitutionRepository implements IInstitutionRepository {
	async create(data: InstitutionDataDTO): Promise<Institution> {
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

	async findById(id: string): Promise<Institution> {
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

	async findByEmail(email: string): Promise<Institution> {
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

	async findMany(): Promise<Institution[]> {
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

	async delete(id: string): Promise<Institution> {
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

	async update(id: string, data: UpdateInstitutionDataDTO): Promise<Institution> {
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