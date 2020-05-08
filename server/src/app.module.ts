import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.config.env',
            isGlobal: true,
		}),
		MongooseModule.forRoot(`mongodb://localhost/${process.env.DBname}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
