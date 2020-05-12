import axiosInstance from './request';
import qs from 'qs';

interface ICreateCalendar {
	name: string;
}

export const createCalendarUrl = (payload: ICreateCalendar) => {
	return axiosInstance.post(`/calendar/create`, qs.stringify({ ...payload }));
};
