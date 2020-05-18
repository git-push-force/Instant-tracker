export class EventDto {
	name: string;
	description: string;
	id: string; //calendar id
	dateStart: string;
	dateEnd: string;
	likes: number;
	important: number;
	notes: object[];
}
