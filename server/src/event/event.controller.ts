import { Controller, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('api/event')
export class EventController {
	constructor(private eventService: EventService) {}

	@Post('create')
	create(@Query() query) {
		return this.eventService.create(query);
	}

	@Post('update')
	update(@Query() query) {
		return this.eventService.update(query);
	}

	@Post('remove')
	remove(@Query() query) {
		return this.eventService.remove(query);
	}
}
