import { Controller, Get, Post, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('api/calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

    @Get('get')
    list(@Query() query) {
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
    remove() {
        return this.calendarService.remove();
    }

    @Post('change-password')
    setPassword(@Query() query) {
        return this.calendarService.setPassword(query);
    }
}
