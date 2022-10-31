export interface UpdateEventRequestDTO {
	id: string;
	event_id: string
	title: string;
	description: string;
	speaker: string;
	online: boolean;
	price: string;
	address: string;
	start_date: Date;
	end_date: Date;
	participants: number;
	image: string;
}