import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICalendar } from '../calendar/interfaces/calendar.interface';
import * as moment from 'moment';

import {
	NeedPassword,
	WrongPassword,
	InvalidProperty,
	NotExist,
} from '../exceptions';

@Injectable()
export class NoteGuard implements CanActivate {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	async generalCheck(query, forCreate) {
		
		if (!query.id) throw new InvalidProperty('calendar id');
		if (query.id.length > 24 || query.id.length < 24)
			throw new NotExist('Calendar', 'id');

		const founded = await this.calendarModel.findById(query.id);

		if (!founded)
			throw new NotExist('Calendar', 'id');

		if (founded.password) {
			if (!query.password) 
				throw new NeedPassword();

			if (query.password !== founded.password)
				throw new WrongPassword();
		}

		if (!query.eventId || !query.eventId.length)
			throw new InvalidProperty('event id');		

		if (!founded.events.find(item => item.id === query.eventId))
			throw new NotExist('Event', 'id');

		if (!forCreate && !query.noteId) 
			throw new InvalidProperty('note id');

		if (forCreate) {
			if (!query.content)
				throw new InvalidProperty('note content');
		}			
	}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { query, path } = request;

		switch (path) {
			case '/api/note/remove':
			case '/api/note/like':
			case '/api/note/update': {
				await this.generalCheck(query, false);
				break;
			}
			case '/api/note/create': {
				await this.generalCheck(query, true);
				break;
			}
		}
		return true;
	}
}
