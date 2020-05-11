import { Document } from 'mongoose';

export interface INote {
	content: string;
	id: string;
	date: string;
	likes: number;
}

export interface INoteCreate extends Document {
	content: string;
	date: string;
	likes: number;
}
