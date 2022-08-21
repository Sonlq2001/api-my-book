export interface IUser {
	name: string;
	email: string;
	password: string;
	avatar: string;
	refresh_token: string;
	mode: string;
	isCheckPassword: (password: String) => Promise<Boolean>;
	_doc: Omit<this, "_doc">;
}

export interface IBook {
	name: string;
	price: number;
	image: string;
	start_time: Date | string;
	end_time: Date | string;
	text_notes: string[];
	description: string;
	status: number;
	user_id: string;
}

export interface IRequestBodyAuth {
	name?: String;
	email: String;
	password: String;
}
