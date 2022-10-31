export interface InstitutionDataDTO {
	data: {
		name: string;
		description: string;
		email: string;
		password: string;
		image: string;
		updated_at?: Date;
	}
}