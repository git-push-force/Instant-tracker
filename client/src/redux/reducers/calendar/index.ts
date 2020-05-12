import * as actionTypes from '../../types/calendar';

const initState = {
	data: {},
	isFetching: false,
	isCreated: false,
};

export interface ICalendarReducer {
	data: {
		name: string;
		_id: string;
		description: string;
		events: [];
	};
	isFetching: boolean;
	isCreated: boolean;
}

interface IAction {
	type: string;
	payload: any;
}

const createReducer = (state = initState, action: IAction) => {
	switch (action.type) {
		case actionTypes.CREATE_CALENDAR: {
			return {
				...state,
				isFetching: true,
			};
		}

		case actionTypes.CREATE_CALENDAR_SUCCESS: {
			return {
				...state,
				isFetching: false,
				data: action.payload,
				isCreated: true,
			};
		}

		case actionTypes.CREATE_CALENDAR_ERROR: {
			return {
				...state,
				isFetching: false,
			};
		}
		default:
			return state;
	}
};

export default createReducer;
