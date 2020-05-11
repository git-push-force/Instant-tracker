import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

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

	async checkDate(query) {
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

		return founded;
	}

	async create(query: NoteDto) {
		const founded = await this.check(query, true);
		const { events } = founded;
		const activeEvent =
			events[events.findIndex(event => event.id === query.eventId)];

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
							...founded.events.filter(
								item => item.id !== query.eventId
							),
							{
								...activeEvent,
								notes: [
									...activeEvent.notes,
									{
										likes: 0,
										content: query.content,
										id: activeEvent.notes.length.toString(),
										date: query.date,
									},
								],
							},
						],
					},
				},
				{ new: true }
			);
		} catch (err) {
			throw new InternalError();
		}
	}

	async update(query) {
		const founded = await this.check(query, false);
		const { events } = founded;
		const activeEvent =
			events[events.findIndex(event => event.id === query.eventId)];
		const activeNote =
			activeEvent.notes[
				activeEvent.notes.findIndex(note => note.id === query.noteId)
			];

		if (!activeNote) throw new NotExist('Note', 'id');

		if (query.date) this.checkDate(query);

		try {
			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							...founded.events.filter(
								item => item.id !== query.eventId
							),
							{
								...activeEvent,
								notes: [
									...activeEvent.notes.filter(
										item => item.id !== query.noteId
									),
									{
										...activeNote,
										content: query.content
											? query.content
											: activeNote.content,
										id: activeNote.id,
										date: query.date
											? query.date
											: activeNote.date,
									},
								],
							},
						],
					},
				},
				{ new: true }
			);
		} catch (err) {
			throw new InternalError();
		}
	}

	async remove(query) {
		const founded = await this.check(query, false);
		const { events } = founded;
		const activeEvent =
			events[events.findIndex(event => event.id === query.eventId)];

		if (!query.noteId) throw new InvalidProperty('note id');

		try {
			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							...founded.events.filter(
								item => item.id !== query.eventId
							),
							{
								...activeEvent,
								notes: activeEvent.notes.filter(
									item => item.id !== query.noteId
								),
							},
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
		const founded = await this.check(query, false);
		const { events } = founded;
		const activeEvent =
			events[events.findIndex(event => event.id === query.eventId)];
		const activeNote =
			activeEvent.notes[
				activeEvent.notes.findIndex(note => note.id === query.noteId)
			];

		if (!activeNote) throw new NotExist('Note', 'id');

		if (query.date) this.checkDate(query);

		try {
			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						events: [
							...founded.events.filter(
								item => item.id !== query.eventId
							),
							{
								...activeEvent,
								notes: [
									...activeEvent.notes.filter(
										item => item.id !== query.noteId
									),
									{
										...activeNote,
										likes: activeNote.likes + 1,
									},
								],
							},
						],
					},
				},
				{ new: true }
			);
		} catch (err) {
			throw new InternalError();
		}
	}
}
