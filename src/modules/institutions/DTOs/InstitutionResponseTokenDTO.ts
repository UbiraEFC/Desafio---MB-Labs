export interface InstitutionResponseTokenDTO {
	token: string;
	institution: {
		id: string;
		created_at: Date;
		updated_at: Date;
		last_login: Date;
	};
}