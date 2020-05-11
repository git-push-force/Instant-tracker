import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { ICalendar } from '../calendar/interfaces/calendar.interface';
import { EventDto } from './dto/event.dto';
import {
	InternalError,
	NeedPassword,
	WrongPassword,
	InvalidProperty,
	NotExist,
} from '../exceptions';

@Injectable()
export class EventService {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	async check(query, forCreate) {
		if (!query.id) throw new InvalidProperty('calendar id');
		if (query.id.length > 24) throw new NotExist('Calendar', 'id');

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

		if (!forCreate) {
			if (!query.eventId || !query.eventId.length)
				throw new InvalidProperty('event id');

			if (!founded.events.find(item => item.id === query.eventId)) {
				throw new NotExist('Event', 'id');
			}
		} else {
			if (!query.name || !query.name.length)
				throw new InvalidProperty('event name');
		}

		return founded;
	}

	async create(query: EventDto) {
		const founded = await this.check(query, true);

		if (!query.date) throw new InvalidProperty('date');

		const dateFormat = 'YYYY-MM-DD';
		const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

		if (
			!moment(query.date, dateTimeFormat, true).isValid() &&
			!moment(query.date, dateFormat, true).isValid()
		) {
			throw new InvalidProperty('date');
		}

		try {
			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							...founded.events,
							{
								name: query.name,
								description: query.description,
								id: founded.events.length.toString(),
								date: query.date,
								likes: 0,
								important: query.important
									? query.important
									: false,
								notes: [],
							},
						],
					},
				},
				{
					new: true,
				}
			);
		} catch (err) {
			throw new InternalError();
		}
	}

	async update(query) {
		const founded = await this.check(query, false);

		try {
			const foundedEvent = founded.events.find(
				item => item.id === query.eventId
			);

			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							...founded.events.filter(
								item => item.id !== query.eventId
							),
							{
								...foundedEvent,
								name: query.name
									? query.name
									: foundedEvent.name,
								description: query.description
									? query.description
									: foundedEvent.description,
							},
						],
					},
				},
				{
					new: true,
				}
			);
		} catch (err) {
			throw new InternalError();
		}
	}

	async remove(query) {
		const founded = await this.check(query, false);

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

	async like(query) {
		const founded = await this.check(query, false);

		try {
			const foundedEvent = founded.events.find(
				item => item.id === query.eventId
			);

			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							...founded.events.filter(
								item => item.id !== query.eventId
							),
							{
								...foundedEvent,
								likes: Number(foundedEvent.likes) + 1,
							},
						],
					},
				},
				{
					new: true,
				}
			);
		} catch (err) {
			throw new InternalError();
		}
	}
}
