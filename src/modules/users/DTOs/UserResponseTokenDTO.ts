export interface UserResponseTokenDTO {
	token: string;
	user: {
		id: string;
		created_at: Date;
		updated_at: Date;
		last_login: Date;
	};
}