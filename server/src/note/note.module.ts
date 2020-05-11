import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CalendarModule } from '../calendar/calendar.module';

import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteSchema } from './schemas/note.schema';



@Module({
	imports: [
		CalendarModule,
		MongooseModule.forFeature([
			{ name: 'Note', schema: NoteSchema }
		])
	],
	providers: [NoteService],
	controllers: [NoteController],
})
export class NoteModule {}
