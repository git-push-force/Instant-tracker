import * as actionTypes from '../../types/calendar';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { createCalendarUrl } from '../../../services/urls';

interface ICreate {
	name: string;
}

export const createCalendar = (
	payload: ICreate
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
