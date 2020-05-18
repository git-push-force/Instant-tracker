import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from '../calendar/interfaces/calendar.interface';
import { EventDto } from './dto/event.dto';
import { InternalError } from '../exceptions';

@Injectable()
export class EventService {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	async create(query: EventDto) {
		const founded = await this.calendarModel.findById(query.id);

		try {
			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							{
								name: query.name,
								description: query.description,
								id: founded.events.length.toString(),
								dateStart: query.dateStart,
								dateEnd: query.dateEnd,
								likes: 0,
								important: query.important,
								notes: [],
							},
							...founded.events,
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
		const founded = await this.calendarModel.findById(query.id);

		try {
			const foundedEvent = founded.events.find(
				item => item.id === query.eventId
			);

			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							{
								...foundedEvent,
								name: query.name
									? query.name
									: foundedEvent.name,
								description: query.description
									? query.description
									: foundedEvent.description,
							},
							...founded.events.filter(
								item => item.id !== query.eventId
							)
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
		const founded = await this.calendarModel.findById(query.id);

		try {
			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							...founded.events.filter(
								item => item.id !== query.eventId
							),
						],
					},
				},
				{ new: true }
			);
		} catch (err) {
			throw new InternalError();
		}
	}

	async like(query) {
		const founded = await this.calendarModel.findById(query.id);

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
								likes: Number(foundedEvent.likes) + Number(
									query.important ? '1' : '-1'
								),
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

	async important(query) {
		const founded = await this.calendarModel.findById(query.id);

		try {
			const foundedEvent = founded.events.find(
				item => item.id === query.eventId
			);

			const foundedEventIndex = founded.events.findIndex(
				item => item.id === query.eventId
			);


			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [

							...founded.events.map(event => {
								if (event.id === query.eventId) {
									return {
										...event,
										important: query.important
									}
								}
								return event;
							})
						],
					},
				},
				{
					new: true,
				}
			);
		} catch (err) {

		}
	}
}
