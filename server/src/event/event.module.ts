import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { CalendarModule } from '../calendar/calendar.module';

@Module({
	imports: [CalendarModule],
	providers: [EventService],
	controllers: [EventController],
})
export class EventModule {}
