import { Controller, Post, Query, UseGuards, Body } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteGuard } from './note.guard';

@Controller('api/note')
@UseGuards(NoteGuard)
export class NoteController {
	constructor(private noteService: NoteService) {}

	@Post('create')
	create(@Body() query) {
		return this.noteService.create(query);
	}

	@Post('update')
	update(@Body() query) {
		return this.noteService.update(query);
	}

	@Post('remove')
	remove(@Body() query) {
		return this.noteService.remove(query);
	}

	@Post('like')
	like(@Body() query) {
		return this.noteService.like(query);
	}
}
