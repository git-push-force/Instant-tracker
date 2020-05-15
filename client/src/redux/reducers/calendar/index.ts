import * as calendarTypes from '../../types/calendar';
import * as eventTypes from '../../types/event';

export interface IEvent {
	name: string;
	description: string;
	dateStart: string;
	dateEnd?: string;
	likes: number;
	important: boolean;
	notes: [];
}
export interface ICalendarReducer {
	data: {
		name: string;
		id: string;
		description: string;
		events: IEvent[];
		password: string;
	};
	isFetching: boolean;
	isCreated: boolean;
	eventFetching: boolean;
}

interface IAction {
	type: string;
	payload: any;
}

const initState = {
	data: {
		events: []
	},
	isFetching: false,
	isCreated: false,
	eventFetching: false
};

const createReducer = (state = initState, action: IAction) => {
	switch (action.type) {
		case calendarTypes.GET_CALENDAR:
		case calendarTypes.CREATE_CALENDAR: {
			return {
				...state,
				isFetching: true,
			};
		}

		case calendarTypes.CREATE_CALENDAR_SUCCESS: {
			return {
				...state,
				isFetching: false,
				data: {
					...action.payload,
					id: action.payload._id
				},
				isCreated: true,
			};
		}

		case calendarTypes.GET_CALENDAR_SUCCESS: {
			return {
				...state,
				isFetching: false,
				data: {
					...action.payload,
					id: action.payload._id
				}
			};
		}

		case calendarTypes.GET_CALENDAR_ERROR:
		case calendarTypes.CREATE_CALENDAR_ERROR: {
			return {
				...state,
				isFetching: false,
			};
		}

		case eventTypes.CREATE_EVENT: {
			return {
				...state,
				eventFetching: true
			}
		}

		case eventTypes.CREATE_EVENT_SUCCESS: {
			return {
				...state,
				eventFetching: false,
				data: {
					...action.payload,
					id: action.payload._id
				}
			}
		}

		case eventTypes.CREATE_EVENT_ERROR: {
			return {
				...state,
				eventFetching: false
			}
		}

		default:
			return state;
	}
};

export default createReducer;
