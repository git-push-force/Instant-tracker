import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarGuard } from './calendar.guard';

@Controller('api/calendar')
@UseGuards(CalendarGuard)
export class CalendarController {
	constructor(private calendarService: CalendarService) {}

	@Post('get')
	get(@Query() query) {
		return this.calendarService.get(query);
	}

	@Post('create')
	create(@Query() query) {
		return this.calendarService.create(query);
	}

	@Post('update')
	update(@Query() query) {
		return this.calendarService.update(query);
	}

	@Post('remove')
	remove(@Query() query) {
		return this.calendarService.remove(query);
	}

	@Post('change-password')
	setPassword(@Query() query) {
		return this.calendarService.changePassword(query);
	}
}
