export class NoteDto {
	name: string;
	description: string;
	id: string; //note id
	date: string;
	likes: number;
	permanent: boolean;
	important: boolean;
	notes: object[];
}
