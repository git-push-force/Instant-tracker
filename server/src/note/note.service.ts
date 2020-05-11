import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NoteDto } from './dto/note.dto';
import { ICalendar } from '../calendar/interfaces/calendar.interface';
import {
	InternalError,
	NeedPassword,
	WrongPassword,
	InvalidProperty,
	NotExist,
} from '../exceptions';


@Injectable()
export class NoteService {
	
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	async check(query) {
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

		if (!query.eventId || !query.eventId.length)
				throw new InvalidProperty('event id');

		if (!founded.events.find(item => item.id === query.eventId)) {
			throw new NotExist('Event', 'id');
		}

		if (!query.name) throw new InvalidProperty('note name');

		if (!query.date) throw new InvalidProperty('note date');

		return founded;		
	}

	async create(noteDto: NoteDto) {
		const founded = await this.check(noteDto);
		const { events } = founded;
		const activeEvent = events[events.findIndex(event => event.id === noteDto.eventId)];

		try {
			return await this.calendarModel.findByIdAndUpdate(
				noteDto.id,
				{
					$set: {
						events: [
							...founded.events.filter(item => item.id !== noteDto.eventId),
							{
								...activeEvent,
								notes: [
									...activeEvent.notes,
									{
										name: noteDto.name,
										description: noteDto.description ? noteDto.description : '',
										id: activeEvent.notes.length.toString(),
										date: noteDto.date
									}
								]
							}
						]
					}
				},
				{ new: true }
			)
		} catch (err) {
			throw new InternalError();
		}
	}

	update(query) {}
	
	remove(query) {}
}
