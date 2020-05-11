import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { CalendarModule } from '../calendar/calendar.module';
import { DateModule } from '../date/date.module';

@Module({
	imports: [CalendarModule, DateModule],
	providers: [EventService],
	controllers: [EventController],
})
export class EventModule {}
