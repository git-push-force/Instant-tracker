import { Document } from 'mongoose';

export interface INote {
	name: string;
	description: string;
	id: string;
	date: object;
	likes: number;
	permanent: boolean;
	important: boolean;
	notes: [];
}

export interface INoteCreate extends Document {
	name: string;
	description: string;
	date: object;
	likes: number;
	permanent: boolean;
	important: boolean;
	notes: [];
}
