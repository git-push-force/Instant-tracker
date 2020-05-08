import { Document } from 'mongoose';

export interface ICalendarInterface extends Document {
    name: string;
    password: string;
    events: [];
}
