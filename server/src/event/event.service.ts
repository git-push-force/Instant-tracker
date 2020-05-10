import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from '../calendar/interfaces/calendar.interface';
import { EventDto } from './dto/event.dto';
import {
	InternalError,
	NeedPassword,
	WrongPassword,
	InvalidProperty,
	AlreadyExist,
} from '../exceptions';

@Injectable()
export class EventService {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	checkPassword(query, founded) {
		if (founded.password) {
			if (!query.password) {
				throw new NeedPassword();
			}

			if (query.password !== founded.password) {
				throw new WrongPassword();
			}
		}
		return founded;
	}

	checkId(query) {
		if (!query.id) throw new InvalidProperty('calendar id');
	}

	async checkIsExist(query) {
		try {
			return await this.calendarModel.findById(query.id);
		} catch (err) {
			throw new AlreadyExist('Calendar', 'id');
		}
	}

	checkEventId(query) {
		if (!query.eventId || !query.eventId.length)
			throw new InvalidProperty('event id');
	}

	checkIsEventExist(query, founded) {
		if (!founded.events.find(item => item.id === query.eventId)) {
			throw new AlreadyExist('Event', 'id');
		}
	}

	async create(query: EventDto) {
		this.checkId(query);
		const founded = await this.checkIsExist(query);
		this.checkPassword(query, founded);

		if (!query.name || !query.name.length)
			throw new InvalidProperty('event name');

		try {
			return await this.calendarModel.findByIdAndUpdate(query.id, {
				$set: {
					events: [
						...founded.events,
						{
							name: query.name,
							description: query.description,
							id: founded.events.length.toString(),
						},
					],
				},
			});
		} catch (err) {
			throw new InternalError();
		}
	}

	async update(query) {
		this.checkId(query);
		const founded = await this.checkIsExist(query);
		this.checkPassword(query, founded);
		this.checkEventId(query);
		this.checkIsEventExist(query, founded);

		try {
			const foundedEvent = founded.events.find(
				item => item.id === query.eventId
			);

			return await this.calendarModel.findByIdAndUpdate(query.id, {
				$set: {
					events: [
						...founded.events.filter(
							item => item.id !== query.eventId
						),
						{
							...foundedEvent,
							name: query.name ? query.name : foundedEvent.name,
							description: query.description
								? query.description
								: foundedEvent.description,
						},
					],
				},
			});
		} catch (err) {
			throw new InternalError();
		}
	}

	async remove(query) {
		this.checkId(query);
		const founded = await this.checkIsExist(query);
		this.checkPassword(query, founded);
		this.checkEventId(query);
		this.checkIsEventExist(query, founded);

		try {
			return await this.calendarModel.findByIdAndUpdate(query.id, {
				$set: {
					events: [
						...founded.events.filter(
							item => item.id !== query.eventId
						),
					],
				},
			});
		} catch (err) {
			throw new InternalError();
		}
	}
}
