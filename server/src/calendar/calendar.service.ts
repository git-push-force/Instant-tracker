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

    update() {}

    remove() {}

    setPassword(query) {}
}
