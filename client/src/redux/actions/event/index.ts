import * as actionTypes from '../../types/event';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { createEventUrl, ICreateEvent, markAsImportantUrl, IMarkAsImportant } from '../../../services/urls';

export const createEvent = (
	payload: ICreateEvent
): ThunkAction<void, Object, unknown, Action<string>> => async dispatch => {
	dispatch({ type: actionTypes.CREATE_EVENT });

	try {
		const response = await createEventUrl(payload);
		const { data } = response;
		dispatch({
			type: actionTypes.CREATE_EVENT_SUCCESS,
			payload: data
		});
	} catch (err) {
		dispatch({ type: actionTypes.CREATE_EVENT_ERROR });
	}
};


export const markAsImportant = (
	payload: IMarkAsImportant
): ThunkAction<void, Object, unknown, Action<string>> => async dispatch => {
	dispatch({ type: actionTypes.MARK_AS_IMPORTANT });

	try {
		const response = await markAsImportantUrl(payload);
		const { data } = response;
		dispatch({
			type: actionTypes.MARK_AS_IMPORTANT_SUCCESS,
			payload: data
		});
	} catch (err) {
		dispatch({ type: actionTypes.MARK_AS_IMPORTANT_ERROR });
	}
};
