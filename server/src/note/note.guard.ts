import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICalendar } from '../calendar/interfaces/calendar.interface';
import * as moment from 'moment';

import {
	InternalError,
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
		if (!founded) throw new NotExist('Calendar', 'id');

		if (founded.password) {
			if (!query.password) {
				throw new NeedPassword();
			}

			if (query.password !== founded.password) {
				throw new WrongPassword();
			}
		}

		if (!query.eventId || !query.eventId.length)
			throw new InvalidProperty('event id');

		if (!founded.events.find(item => item.id === query.eventId)) {
			throw new NotExist('Event', 'id');
		}

		if (!forCreate) {
			if (!query.noteId) throw new InvalidProperty('note id');
		}

		if (!query.content) throw new InvalidProperty('note content');

		if (!query.date) throw new InvalidProperty('note date');
	}

	checkDate(query) {
		const dateFormat = 'YYYY-MM-DD';
		const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

		if (query.date) {
			if (
				!moment(query.date, dateTimeFormat, true).isValid() &&
				!moment(query.date, dateFormat, true).isValid()
			) {
				throw new InvalidProperty('date');
			}
		}
	}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { query, path } = request;

		switch (path) {
			case '/api/note/like':
			case '/api/note/update': {
				this.generalCheck(query, false);
				if (query.date) this.checkDate(query);
			}
			case '/api/note/create': {
				this.generalCheck(query, true);
				if (!query.date) throw new InvalidProperty('date');
				this.checkDate(query);
			}
			case '/api/note/remove': {
				this.generalCheck(query, false);
				if (!query.noteId) throw new InvalidProperty('note id');
			}
		}

		return true;
	}
}
