export interface IEventResponseDTO {
	event: {
		id: String;
		created_at: Date;
		updated_at: Date;
		start_date: Date;
		end_date: Date;
	};
}