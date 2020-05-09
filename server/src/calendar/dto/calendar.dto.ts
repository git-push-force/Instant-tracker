import { IEvent } from '../../event/interfaces/event.interface';
export class CalendarDto {
	name: string;
	description: string;
	password: string;
	events: IEvent[];
}
