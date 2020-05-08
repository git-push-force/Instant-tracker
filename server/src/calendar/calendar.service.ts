import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendarInterface } from './interfaces/calendar.interface';
import { CalendarDto } from './dto/calendar.dto';

@Injectable()
export class CalendarService {
    constructor(
        @InjectModel('Calendar')
        private calendarModel: Model<ICalendarInterface>
    ) {}

    async get(query) {
        if (!query.id) {
            throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const founded = await this.calendarModel.find({ _id: query.id });

            // @ts-ignore
            if (founded.password) {
                if (!query.password) {
                    throw new HttpException(
                        'Provide password to get access to this tracker',
                        HttpStatus.UNAUTHORIZED
                    );
                }

                // @ts-ignore
                if (query.password !== founded.password) {
                    throw new HttpException(
                        'Wrong password',
                        HttpStatus.BAD_REQUEST
                    );
                } else {
                    return founded;
                }
            }

            return founded;
        } catch (err) {
            throw new HttpException(
                "Calendar with this id doesn't exist",
                HttpStatus.NOT_FOUND
            );
        }
    }

    async create(calendarDto: CalendarDto) {
        if (!calendarDto.name) {
            throw new HttpException(
                'Name field cannot be black',
                HttpStatus.BAD_REQUEST
            );
        }

        const founded = await this.calendarModel.find({
            name: calendarDto.name,
        });

        if (founded.length) {
            throw new HttpException(
                'Calendar with this name already exists',
                HttpStatus.BAD_REQUEST
            );
        }

        const createdCalendar = new this.calendarModel({
            ...calendarDto,
            events: [],
        });
        return createdCalendar.save();
    }

    async update(query) {
        if (!query.id) {
            throw new HttpException(
                'Enter valid calendar id',
                HttpStatus.BAD_REQUEST
            );
        }

        if (!query.name || !query.name.length) {
            throw new HttpException(
                'Enter valid calendar name',
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            const updated = await this.calendarModel.findByIdAndUpdate(
                query.id,
                { $set: { name: query.name } },
                { new: true }
            );

            return updated;
        } catch (err) {
            throw new HttpException(
                'Internal error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    remove() {}

    setPassword(query) {}
}
