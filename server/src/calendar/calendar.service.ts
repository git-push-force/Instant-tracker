import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICalendarInterface } from './interfaces/calendar.interface';
import { CalendarDto } from './dto/calendar.dto';

@Injectable()
export class CalendarService {
    
    constructor(@InjectModel('Calendar') private calendarModel: Model<ICalendarInterface>) {}

    async get(id: string) {
        return this.calendarModel.find({ _id: id });
    }

    async create(calendarDto: CalendarDto) {

        if (!calendarDto.name) {
            throw new HttpException(
                    'Name field cannot be black', 
                    HttpStatus.BAD_REQUEST
                );
        }

        const founded = await this.calendarModel.find({ name: calendarDto.name });
        
        if (founded.length) {
            throw new HttpException(
                    'Tracker with this name already exists', 
                    HttpStatus.BAD_REQUEST
                );
        }

        const createdCalendar = new this.calendarModel(calendarDto);
        return createdCalendar.save();
    }

    update() {}

    remove() {}
}
