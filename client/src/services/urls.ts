import axiosInstance from './request';
import qs from 'qs';

export interface ICreateCalendar {
	name: string;
}
export const createCalendarUrl = (payload: ICreateCalendar) => {
	return axiosInstance.post(`/calendar/create`, qs.stringify({ ...payload }));
};


export interface IGetCalendar {
	id: string;
	password?: string;
}
export const getCalendarUrl = (payload: IGetCalendar) => {
	return axiosInstance.post(`/calendar/get`, qs.stringify({ ...payload }));
};


export interface ICreateEvent {
	name: string;
	description: string;
	dateStart: string;
	dateEnd?: string;
	important?: boolean;
	id: string;
	password?: string;
}
export const createEventUrl = (payload: ICreateEvent) => {
	return axiosInstance.post(`/event/create`, qs.stringify({ ...payload }))
}