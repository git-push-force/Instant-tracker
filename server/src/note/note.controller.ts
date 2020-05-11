import { Controller, Post, Query } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('api/note')
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
}
