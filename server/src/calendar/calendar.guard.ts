import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from './interfaces/calendar.interface';

import {
	InvalidProperty,
	WrongPassword,
	NeedPassword,
	NotExist,
} from '../exceptions';

@Injectable()
export class CalendarGuard implements CanActivate {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	async generalCheck(query) {
		if (!query.id) throw new InvalidProperty('calendar id');
		if (query.id.length > 24 && query.id.length < 24)
			throw new NotExist('Calendar', 'id');

		const founded = await this.calendarModel.findById(query.id);

		if (!founded) throw new NotExist('Calendar', 'id');

		if (founded.password) {
			if (!query.password) throw new NeedPassword();
			if (query.password !== founded.password) throw new WrongPassword();
		}
	}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const { query, path } = request;

		switch (path) {
			case '/api/calendar/get':
			case '/api/calendar/update':
			case '/api/calendar/remove': {
				await this.generalCheck(query);
				break;
			}

			case '/api/calendar/create': {
				if (!query.name) throw new InvalidProperty('calendar name');
				break;
			}

			case '/api/calendar/change-password': {
				await this.generalCheck(query);
				if (!query.newPassword || query.newPassword.length < 4)
					throw new InvalidProperty('new password');
			}
		}

		return true;
	}
}
