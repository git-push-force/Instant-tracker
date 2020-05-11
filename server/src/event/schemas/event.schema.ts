import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
	name: String,
	description: String,
	date: Object,
	likes: Number,
	permanent: Boolean,
	important: Boolean,
});
