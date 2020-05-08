import { Injectable } from '@nestjs/common';
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
        const createdCalendar = new this.calendarModel(calendarDto);
        return createdCalendar.save();
    }

    update() {}

    remove() {}
}
