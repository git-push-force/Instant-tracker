import { Controller, Post, Query, UseGuards, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGuard } from './event.guard';

@Controller('api/event')
@UseGuards(EventGuard)
export class EventController {
	constructor(private eventService: EventService) {}

	@Post('create')
	create(@Body() query) {
		return this.eventService.create(query);
	}

	@Post('update')
	update(@Body() query) {
		return this.eventService.update(query);
	}

	@Post('remove')
	remove(@Body() query) {
		return this.eventService.remove(query);
	}

	@Post('like')
	like(@Body() query) {
		return this.eventService.like(query);
	}

	@Post('important')
	important(@Body() query) {
		return this.eventService.important(query);
	}
}
