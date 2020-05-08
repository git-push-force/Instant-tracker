import { Module, Get } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { CalendarSchema } from './schemas/calendar.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Calendar', schema: CalendarSchema },
        ]),
    ],
    controllers: [CalendarController],
    providers: [CalendarService],
})
export class CalendarModule {}
