import { Document } from 'mongoose';
import { INote } from '../../note/interfaces/note.interface';

export interface IEvent {
	name: string;
	description: string;
	id: string;
	date: string;
	likes: number;
	important: boolean;
	notes: INote[];
}

export interface IEventCreate extends Document {
	name: string;
	description: string;
	date: string;
	likes: number;
	important: boolean;
	notes: INote[];
}
