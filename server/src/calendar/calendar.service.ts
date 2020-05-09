import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICalendar } from './interfaces/calendar.interface';
import { CalendarDto } from './dto/calendar.dto';

@Injectable()
export class CalendarService {
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

    async get(query) {
        this.checkId(query);
        const founded = await this.checkIsExist(query);
        return this.checkPassword(query, founded);
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
        });
        return createdCalendar.save();
    }

    async update(query) {
        this.checkId(query);
        const founded = await this.checkIsExist(query);

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
        const founded = await this.checkIsExist(query);
        this.checkPassword(query, founded);

        try {
            return await this.calendarModel.findByIdAndDelete(query.id);
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
