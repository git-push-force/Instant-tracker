import * as actionTypes from '../../types/calendar';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import {
	createCalendarUrl,
	ICreateCalendar,
	getCalendarUrl,
	IGetCalendar,
} from '../../../services/urls';

export const createCalendar = (
	payload: ICreateCalendar
): ThunkAction<void, Object, unknown, Action<string>> => async dispatch => {
	dispatch({ type: actionTypes.CREATE_CALENDAR });

	try {
		const response = await createCalendarUrl(payload);
		const { data } = response;
		dispatch({
			type: actionTypes.CREATE_CALENDAR_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({ type: actionTypes.CREATE_CALENDAR_ERROR });
	}
};

export const getCalendar = (
	payload: IGetCalendar
): ThunkAction<void, Object, unknown, Action<string>> => async dispatch => {
	dispatch({ type: actionTypes.GET_CALENDAR });

	try {
		const response = await getCalendarUrl(payload);
		const { data } = response;
		dispatch({
			type: actionTypes.GET_CALENDAR_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({ type: actionTypes.GET_CALENDAR_ERROR });
		throw err.message;
	}
};
