export class EventDto {
	name: string;
	description: string;
	id: string; //calendar id
	date: string;
	likes: number;
	permanent: boolean;
	important: boolean;
	notes: object[];
}
