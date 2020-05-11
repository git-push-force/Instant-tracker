import { Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { INoteCreate } from './interfaces/note.interface';
import { NoteDto } from './dto/note.dto';

@Controller('api/note')
export class NoteController {
	constructor(
		@InjectModel('Note')
		private noteModel: Model<INoteCreate>
	) {}
}
