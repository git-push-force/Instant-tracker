import { Document } from 'mongoose';

export interface IEvent {
    name: string;
    description: string;
}

export interface IEventCreate extends Document {
    name: string;
    description: string;
}
