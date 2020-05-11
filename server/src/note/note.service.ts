import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { INoteCreate } from './interfaces/note.interface';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
    constructor(
		@InjectModel('Note')
		private noteModel: Model<INoteCreate>
	) {}
}
