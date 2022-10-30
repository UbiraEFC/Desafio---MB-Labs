import { Institution } from "@prisma/client";

export interface InstitutionData {
	data: {
		name: string;
		description: string;
		email: string;
		password: string;
		image: string;
		updated_at?: Date;
	}
}

export interface UpdateInstitutionData {
	data: {
		name: string;
		description: string;
		email: string;
		image: string;
		updated_at?: Date;
	}
}

export interface IInstitutionRepository {
	create(data: InstitutionData): Promise<Institution>;
	findById(id: string): Promise<Institution>;
	findByEmail(email: string): Promise<Institution>;
	findMany(): Promise<Institution[]>;
	delete(id: string): Promise<Institution>;
	update(id: string, data: UpdateInstitutionData): Promise<Institution>;
}