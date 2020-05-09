import * as mongoose from 'mongoose';

export const CalendarSchema = new mongoose.Schema({
	name: String,
	password: String,
	description: String,
	events: Array,
});
