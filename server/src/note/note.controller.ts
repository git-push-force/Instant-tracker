import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteGuard } from './note.guard';

@Controller('api/note')
@UseGuards(NoteGuard)
export class NoteController {
	constructor(private noteService: NoteService) {}

	@Post('create')
	create(@Query() query) {
		return this.noteService.create(query);
	}

	@Post('update')
	update(@Query() query) {
		return this.noteService.update(query);
	}

	@Post('remove')
	remove(@Query() query) {
		return this.noteService.remove(query);
	}

	@Post('like')
	like(@Query() query) {
		return this.noteService.like(query);
	}
}
