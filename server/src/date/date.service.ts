import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { InvalidProperty } from '../exceptions';

@Injectable()
export class DateService {
	parseDate(query) {
		if (!query.date) throw new InvalidProperty('date');

		const { date } = query;
		const dateFormat = 'YYYY-MM-DD';
		const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

		if (moment(date, dateTimeFormat, true).isValid()) {
			return {
				date,
				format: 2,
			};
		} else if (moment(date, dateFormat, true).isValid()) {
			return {
				date,
				format: 1,
			};
		} else {
			throw new InvalidProperty('date');
		}
	}
}
