import { Institution } from "@prisma/client";
import { prismaClient } from "../../../../database/prismaClient";
import { IInstitutionRepository, InstitutionData } from "../IInstitutionRepository";


export class PrismaInstitutionRepository implements IInstitutionRepository {
	async create(data: InstitutionData): Promise<Institution> {
		const institution = await prismaClient.institution.create(data);

		return institution;
	}

	async findById(id: string): Promise<Institution> {
		const institution = await prismaClient.institution.findFirst({
			where: {
				id: id
			}
		});

		return institution;
	}

	async findMany(): Promise<Institution[]> {
		const institutions = await prismaClient.institution.findMany({
			where: { }
		});

		return institutions;
	}

	async delete(id: string): Promise<void> {
		await prismaClient.institution.delete({
			where: {
				id: id
			}
		});
	}

	async update(id: string, data: InstitutionData): Promise<Institution> {
		const institution = await prismaClient.institution.update({
			where: {
				id: id
			},
			data
		});

		return institution;
	}
}