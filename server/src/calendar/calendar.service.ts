import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from './interfaces/calendar.interface';
import { CalendarDto } from './dto/calendar.dto';
import {
	InternalError,
	InvalidProperty,
	WrongPassword,
	NeedPassword,
	AlreadyExist,
} from '../exceptions';

@Injectable()
export class CalendarService {
	constructor(
		@InjectModel('Calendar')
		private calendarModel: Model<ICalendar>
	) {}

	checkPassword(query, founded) {
		if (founded.password) {
			if (!query.password) throw new NeedPassword();

			if (query.password !== founded.password) throw new WrongPassword();
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

	async get(query) {
		this.checkId(query);
		const founded = await this.checkIsExist(query);
		return this.checkPassword(query, founded);
	}

	async create(calendarDto: CalendarDto) {
		if (!calendarDto.name) throw new InvalidProperty('calendar name');

		const founded = await this.calendarModel.find({
			name: calendarDto.name,
		});

		if (founded.length) {
			throw new AlreadyExist('Calendar', 'name');
		}

		const createdCalendar = new this.calendarModel(calendarDto);
		return createdCalendar.save();
	}

	async update(query) {
		this.checkId(query);
		const founded = await this.checkIsExist(query);

		this.checkPassword(query, founded);

		if (!query.name || !query.name.length) {
			throw new InvalidProperty('calendar name');
		}

		try {
			return await this.calendarModel.findByIdAndUpdate(query.id, {
				$set: {
					name: query.name ? query.name : founded.name,
					description: query.description
						? query.description
						: founded.description,
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

		try {
			return await this.calendarModel.findByIdAndDelete(query.id);
		} catch (err) {
			throw new InternalError();
		}
	}

	async setPassword(query) {
		this.checkId(query);

		const founded = await this.calendarModel.findById(query.id);

		this.checkPassword(query, founded);

		if (!query.newPassword || query.newPassword.length < 4) {
			throw new InvalidProperty('new password');
		}

		try {
			return await this.calendarModel.findByIdAndUpdate(query.id, {
				$set: { password: query.password },
			});
		} catch (err) {
			throw new InternalError();
		}
	}
}
