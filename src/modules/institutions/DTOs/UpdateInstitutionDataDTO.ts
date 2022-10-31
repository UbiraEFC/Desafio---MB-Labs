export interface UpdateInstitutionDataDTO {
	data: {
		name: string;
		description: string;
		email: string;
		image: string;
		updated_at?: Date;
	}
}