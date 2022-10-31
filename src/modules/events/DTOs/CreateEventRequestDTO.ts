export interface CreateEventRequestDTO {
	title: string;
	description: string;
	institution_id: string;
	speaker: string;
	online: boolean;
	price: string;
	address: string;
	start_date: Date;
	end_date: Date;
	participants: number;
	image: string;
}