import { Document } from 'mongoose';

export interface INote {
	content: string;
	id: string;
	date: Date | string;
	likes: number;
}

export interface INoteCreate extends Document {
	content: string;
	date: Date;
	likes: number;
}
