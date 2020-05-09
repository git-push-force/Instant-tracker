import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
	name: String,
	description: String,
});
