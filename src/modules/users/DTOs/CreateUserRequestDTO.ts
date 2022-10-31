export interface CreateUserRequestDTO {
	name: string;
	description?: string;
	email: string;
	password: string;
	image?: string;
}