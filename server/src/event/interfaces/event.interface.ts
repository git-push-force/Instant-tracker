import { Document } from 'mongoose';

export interface IEvent {
	name: string;
	description: string;
	id: string;
	date: object;
	likes: number;
	permanent: boolean;
	important: boolean;
	notes: [];
}

export interface IEventCreate extends Document {
	name: string;
	description: string;
	date: object;
	likes: number;
	permanent: boolean;
	important: boolean;
	notes: [];
}
