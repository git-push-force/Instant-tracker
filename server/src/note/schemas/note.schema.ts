import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
	name: String,
	password: String,
	content: String,
});
