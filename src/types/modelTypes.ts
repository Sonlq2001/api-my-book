export interface IUser {
	name: string;
	email: string;
	password: string;
	avatar: string;
	refresh_token: string;
	mode: string;
}

export interface IBook {
	name: string;
	price: number;
	image: string;
	start_time: Date | string;
	end_time: Date | string;
	text_notes: string[];
	description: string;
	status_book: number;
	user_id: string;
}
