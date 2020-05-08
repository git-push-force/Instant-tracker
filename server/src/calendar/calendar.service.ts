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
    }

    checkId(query) {
        if (!query.id) {
            throw new HttpException(
                'Enter valid calendar id',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async get(query) {
        if (!query.id) {
            throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const founded = await this.calendarModel.findById(query.id);

            this.checkPassword(query, founded);

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

        this.checkId(query);

        const founded = await this.calendarModel.findById(query.id);

        this.checkPassword(query, founded);

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

    async remove(query) {
        this.checkId(query);
        const founded = await this.calendarModel.findById(query.id);
        this.checkPassword(query, founded);

        try {
            this.calendarModel.findByIdAndDelete(query.id);
        } catch (err) {
            throw new HttpException(
                'Internal error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async setPassword(query) {
        this.checkId(query);

        const founded = await this.calendarModel.findById(query.id);

        this.checkPassword(query, founded);

        if (!query.newPassword || query.newPassword.length < 4) {
            throw new HttpException(
                'Enter valid new password',
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            const updated = await this.calendarModel.findByIdAndUpdate(
                query.id,
                { $set: { password: query.password } },
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
}
