import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from '../calendar/interfaces/calendar.interface';
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

    checkEventId(query) {
        if (!query.eventId || !query.eventId.length) {
            throw new HttpException(
                'Provide valid event id',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    checkIsEventExist(query, founded) {
        if (!founded.events.find(item => item.id === query.eventId)) {
            throw new HttpException(
                'Event with this id doesn\'t exist',
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

    async update(query) {
        this.checkId(query);
        const founded = await this.checkIsExist(query);
        this.checkPassword(query, founded);
        this.checkEventId(query);
        this.checkIsEventExist(query, founded);

        try {

            const foundedEvent = founded.events.find(item => item.id === query.eventId);

            return await this.calendarModel.findByIdAndUpdate(
                query.id,
                { $set: {
                    events: [
                        ...founded.events.filter(item => item.id !== query.eventId),
                        { 
                            ...foundedEvent,
                            name: query.name ? query.name : foundedEvent.name,
                            description: query.description ? query.description : foundedEvent.description
                        }
                    ]
                }}
            );

        } catch (err) {
            throw new HttpException(
                'Internal error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async remove(query) {
        this.checkId(query);
        const founded = await this.checkIsExist(query);
        this.checkPassword(query, founded);
        this.checkEventId(query);
        this.checkIsEventExist(query, founded);

        try {
            
            const updated = await this.calendarModel.findByIdAndUpdate(
                query.id,
                { $set: {
                    events: [
                        ...founded.events.filter(item => item.id !== query.eventId),
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
}
