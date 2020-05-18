import { Document } from 'mongoose';
import { INote } from '../../note/interfaces/note.interface';

export interface IEvent {
	name: string;
	description: string;
	id: string;
	dateStart: string;
	dateEnd: string;
	likes: number;
	important: number;
	notes: INote[];
}

export interface IEventCreate extends Document {
	name: string;
	description: string;
	dateStart: string;
	dateEnd: string;
	likes: number;
	important: number;
	notes: INote[];
}
