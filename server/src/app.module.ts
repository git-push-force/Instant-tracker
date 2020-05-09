import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CalendarModule } from './calendar/calendar.module';
import { EventModule } from './event/event.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.config.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(`mongodb://localhost/${process.env.DBname}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        CalendarModule,
        EventModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
