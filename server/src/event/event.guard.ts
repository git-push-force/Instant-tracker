import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICalendar } from '../calendar/interfaces/calendar.interface';

@Injectable()
export class EventGuard implements CanActivate {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const { query, path } = request;

		switch (path) {
			case '': {
			}
		}

		return true;
	}
}
