import { Module } from '@nestjs/common';

import { CalendarModule } from '../calendar/calendar.module';

import { NoteService } from './note.service';
import { NoteController } from './note.controller';

@Module({
	imports: [
		CalendarModule
	],
	providers: [NoteService],
	controllers: [NoteController],
})
export class NoteModule {}
