export interface CreateInstitutionRequestDTO {
	name: string;
	description?: string;
	email: string;
	password: string;
	image?: string;
}