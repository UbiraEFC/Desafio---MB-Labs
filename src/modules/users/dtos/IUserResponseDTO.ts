export interface IUserResponseDTO {
	token: string;
	user: {
		id: string;
		created_at: Date;
		updated_at: Date;
		last_login: Date;
	};
}