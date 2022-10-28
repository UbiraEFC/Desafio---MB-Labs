import { Institution } from "@prisma/client";

export interface CreateInstitutionData {
	data: {
		name: string;
		description: string;
		email: string;
		password: string;
		image: string;
	}
}


export interface IInstitutionRepository {
	create(data: CreateInstitutionData): Promise<Institution>;
	findById(id: string): Promise<Institution>;
	findMany(): Promise<Institution[]>;
	delete(id: string): Promise<void>;
	update(id: string): Promise<Institution>;
}