import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CalendarModule } from './calendar/calendar.module';
import { EventModule } from './event/event.module';
import { DateModule } from './date/date.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.config.env',
			isGlobal: true,
		}),
		MongooseModule.forRoot(`mongodb://localhost/${process.env.DBname}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		}),
		CalendarModule,
		EventModule,
		DateModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
