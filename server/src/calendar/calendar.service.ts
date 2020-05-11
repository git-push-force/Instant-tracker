import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from './interfaces/calendar.interface';
import { CalendarDto } from './dto/calendar.dto';
import {
	InternalError,
	InvalidProperty,
	WrongPassword,
	NeedPassword,
	NotExist,
} from '../exceptions';

@Injectable()
export class CalendarService {
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
			if (!query.password) throw new NeedPassword();
			if (query.password !== founded.password) throw new WrongPassword();
		}

		return founded;
	}

	async get(query) {
		return await this.check(query);
	}

	async create(calendarDto: CalendarDto) {
		if (!calendarDto.name) throw new InvalidProperty('calendar name');

		try {
			return await new this.calendarModel(calendarDto).save();
		} catch (err) {
			throw new InternalError();
		}
	}

	async update(query) {
		const founded = await this.check(query);

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
		const founded = await this.check(query);

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
		const founded = await this.check(query);

		if (!query.newPassword || query.newPassword.length < 4) {
			throw new InvalidProperty('new password');
		}

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
