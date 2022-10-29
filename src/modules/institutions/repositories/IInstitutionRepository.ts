import { Institution } from "@prisma/client";

export interface InstitutionData {
	data: {
		name: string;
		description: string;
		email: string;
		password: string;
		image: string;
	}
}

export interface IInstitutionRepository {
	create(data: InstitutionData): Promise<Institution>;
	findById(id: string): Promise<Institution>;
	findByEmail(email: string): Promise<Institution>;
	findMany(): Promise<Institution[]>;
	delete(id: string): Promise<Institution>;
	update(id: string, data: InstitutionData): Promise<Institution>;
}