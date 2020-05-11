import { Document } from 'mongoose';
import { IEvent } from '../../event/interfaces/event.interface';

export interface ICalendar extends Document {
	name: string;
	description: string;
	password?: string;
	events: IEvent[];
}
