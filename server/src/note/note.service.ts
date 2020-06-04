import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { NoteDto } from './dto/note.dto';
import { ICalendar } from '../calendar/interfaces/calendar.interface';
import { InternalError, NotExist } from '../exceptions';

@Injectable()
export class NoteService {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	async create(query: NoteDto) {
		const founded = await this.calendarModel.findById(query.id);
		const { events } = founded;
		const activeEvent =
			events[events.findIndex(event => event.id === query.eventId)];

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
									{
										likes: 0,
										content: query.content,
										id: activeEvent.notes.length.toString(),
										date: moment(new Date()).format('YYYY-MM-DD hh:mm'),
									},
									...activeEvent.notes
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
		const founded = await this.calendarModel.findById(query.id);
		const { events } = founded;
		const activeEvent =
			events[events.findIndex(event => event.id === query.eventId)];
		const activeNote =
			activeEvent.notes[
				activeEvent.notes.findIndex(note => note.id === query.noteId)
			];

		if (!activeNote) throw new NotExist('Note', 'id');

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
										id: activeNote.id
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
		const founded = await this.calendarModel.findById(query.id);
		const { events } = founded;
		const activeEvent =
			events[events.findIndex(event => event.id === query.eventId)];

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
		const founded = await this.calendarModel.findById(query.id);
		const { events } = founded;
		const activeEvent =
			events[events.findIndex(event => event.id === query.eventId)];
		const activeNote =
			activeEvent.notes[
				activeEvent.notes.findIndex(note => note.id === query.noteId)
			];

		if (!activeNote) throw new NotExist('Note', 'id');

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
