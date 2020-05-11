import { Document } from 'mongoose';

export interface INote {
	name: string;
	description: string;
	id: string;
	date: string;
}

export interface INoteCreate extends Document {
	name: string;
	description: string;
	date: string;
}
