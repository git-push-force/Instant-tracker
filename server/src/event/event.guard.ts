import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { ICalendar } from '../calendar/interfaces/calendar.interface';

import {
	InvalidProperty,
	WrongPassword,
	NeedPassword,
	NotExist,
} from '../exceptions';

@Injectable()
export class EventGuard implements CanActivate {
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
			if (!query.password) throw new NeedPassword();
			if (query.password !== founded.password) throw new WrongPassword();
		}

		if (!forCreate) {
			if (!query.eventId || !query.eventId.length)
				throw new InvalidProperty('event id');

			if (!founded.events.find(item => item.id === query.eventId))
				throw new NotExist('Event', 'id');
		}
	}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { body:query, path } = request;

		switch (path) {
			case '/api/event/update':
			case '/api/event/remove':
			case '/api/event/like': {
				await this.generalCheck(query, false);
				break;
			}
			case '/api/event/create': {
				await this.generalCheck(query, true);

				if (!query.name) throw new InvalidProperty('event name');

				if (!query.dateStart) throw new InvalidProperty('date start');

				const dateFormat = 'YYYY-MM-DD';
				const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

				if (
					!moment(query.dateStart, dateTimeFormat, true).isValid() &&
					!moment(query.dateStart, dateFormat, true).isValid()
				) {
					throw new InvalidProperty('date');
				}
				break;
			}
		}

		return true;
	}
}
