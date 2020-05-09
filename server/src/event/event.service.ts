import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from '../calendar/interfaces/calendar.interface';
import { IEventCreate } from './interfaces/event.interface';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectModel('Calendar')
        private calendarModel: Model<ICalendar>
    ) {}

    checkPassword(query, founded) {
        if (founded.password) {
            if (!query.password) {
                throw new HttpException(
                    'Provide password to get access to this calendar',
                    HttpStatus.UNAUTHORIZED
                );
            }

            if (query.password !== founded.password) {
                throw new HttpException(
                    'Wrong password',
                    HttpStatus.BAD_REQUEST
                );
            }
        }
        return founded;
    }

    checkId(query) {
        if (!query.id) {
            throw new HttpException(
                'Enter valid calendar id',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async checkIsExist(query) {
        try {
            return await this.calendarModel.findById(query.id);
        } catch (err) {
            throw new HttpException(
                "Calendar with this id doesn't exist",
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async create(query: EventDto) {
        this.checkId(query);
        const founded = await this.checkIsExist(query);
        this.checkPassword(query, founded);

        if (!query.name || !query.name.length) {
            throw new HttpException(
                'Enter valid event name',
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            const updated = await this.calendarModel.findByIdAndUpdate(
                query.id,
                { $set: {
                    events: [
                        ...founded.events,
                        { 
                            name: query.name,
                            description: query.description,
                            id: founded.events.length.toString()
                        }
                    ]
                }}
            );

            return updated;
        } catch (err) {
            throw new HttpException(
                'Internal error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    update(query) {}

    remove(query) {}
}
