import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DateService } from '../date/date.service';
import { ICalendar } from '../calendar/interfaces/calendar.interface';
import { EventDto } from './dto/event.dto';
import {
	InternalError,
	NeedPassword,
	WrongPassword,
	InvalidProperty,
	NotExist
} from '../exceptions';

@Injectable()
export class EventService {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>,
		private dateService: DateService
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

		if (query.id.length > 24) throw new NotExist('Calendar', 'id');
		const founded = await this.calendarModel.findById(query.id);
		if (!founded) throw new NotExist('Calendar', 'id');
		return founded;
	}

	checkEvent(query, founded) {
		if (!query.eventId || !query.eventId.length)
			throw new InvalidProperty('event id');

		if (!founded.events.find(item => item.id === query.eventId)) {
			throw new NotExist('Event', 'id');
		}
	}

	async create(query: EventDto) {
		this.checkId(query);
		const founded = await this.checkIsExist(query);
		this.checkPassword(query, founded);

		if (!query.name || !query.name.length)
			throw new InvalidProperty('event name');

		if (!query.date || !query.date.length)
			throw new InvalidProperty('event date');

		try {
			return await this.calendarModel.findByIdAndUpdate(query.id, {
				$set: {
					events: [
						...founded.events,
						{
							name: query.name,
							description: query.description,
							id: founded.events.length.toString(),
							date: this.dateService.parseDate(query.date)
						},
					],
				},
			}, {
				new: true
			});
		} catch (err) {
			throw new InternalError();
		}
	}

	async update(query) {
		this.checkId(query);
		const founded = await this.checkIsExist(query);
		this.checkPassword(query, founded);
		this.checkEvent(query, founded);

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
			}, {
				new: true
			});
		} catch (err) {
			throw new InternalError();
		}
	}

	async remove(query) {
		this.checkId(query);
		const founded = await this.checkIsExist(query);
		this.checkPassword(query, founded);
		this.checkEvent(query, founded);

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
