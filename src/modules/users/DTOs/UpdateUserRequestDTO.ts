export interface UpdateUserRequestDTO {
	id: string;
	name: string;
	description?: string;
	email: string;
	image?: string;
}