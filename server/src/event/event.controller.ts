import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGuard } from './event.guard';

@Controller('api/event')
@UseGuards(EventGuard)
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

	@Post('like')
	like(@Query() query) {
		return this.eventService.like(query);
	}
}
