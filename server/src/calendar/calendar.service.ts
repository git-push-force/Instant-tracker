import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from './interfaces/calendar.interface';
import { CalendarDto } from './dto/calendar.dto';
import { InternalError } from '../exceptions';

@Injectable()
export class CalendarService {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	async get(query) {
		return await this.calendarModel.findById(query.id);
	}

	async create(query: CalendarDto) {
		try {
			return await new this.calendarModel(query).save();
		} catch (err) {
			throw new InternalError();
		}
	}

	async update(query) {
		const founded = await this.calendarModel.findById(query.id);

		try {
			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						name: query.name ? query.name : founded.name,
						description: query.description
							? query.description
							: founded.description,
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
		try {
			await this.calendarModel.findByIdAndDelete(query.id);
			return {
				status: 200,
				message: 'ok',
			};
		} catch (err) {
			throw new InternalError();
		}
	}

	async changePassword(query) {
		try {
			return await this.calendarModel.findByIdAndUpdate(
				query.id,
				{
					$set: {
						password: query.newPassword,
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
