import { Controller, Get, Post, Query, Param } from '@nestjs/common'
import { CalendarService } from './calendar.service'

@Controller('api/calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

    @Get('list')
    list(@Param('id') id) {
        return this.calendarService.get(id);
    }

    @Post('create')
    create(@Query() query) {
        return this.calendarService.create(query);
    }

    @Post('update')
    update() {
        return this.calendarService.update()
    }

    @Post('remove')
    remove() {
        return this.calendarService.remove()
    }
}
