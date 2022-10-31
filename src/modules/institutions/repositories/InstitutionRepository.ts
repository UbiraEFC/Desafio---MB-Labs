import { Institution } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { InstitutionDataDTO } from "../DTOs/InstitutionDataDTO";
import { UpdateInstitutionDataDTO } from "../DTOs/UpdateInstitutionDataDTO";
import { IInstitutionRepository } from "../interfaces/IInstitutionRepository";

export class InstitutionRepository implements IInstitutionRepository {
	async create(data: InstitutionDataDTO): Promise<Institution> {
		return prismaClient.institution.create({
			...data
		});
	}

	async findById(id: string): Promise<Institution> {
		const institution = await prismaClient.institution.findFirst({
			where: { id }
		});

		return institution;
	}

	async findByEmail(email: string): Promise<Institution> {
		return prismaClient.institution.findUnique({
			where: { email }
		});
	}

	async findMany(): Promise<Institution[]> {
		return prismaClient.institution.findMany({
			where: {}
		});
	}

	async delete(id: string): Promise<Institution> {
		return prismaClient.institution.delete({
			where: { id }
		});
	}

	async update(id: string, data: UpdateInstitutionDataDTO): Promise<Institution> {
		return prismaClient.institution.update({
			where: { id },
			...data
		});
	}
}