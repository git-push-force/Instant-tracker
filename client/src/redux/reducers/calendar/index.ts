import * as calendarTypes from '../../types/calendar';
import * as eventTypes from '../../types/event';

//TODO: need to optimize actions working with data in redux by injecting only NEW or UPDATED data instead change all data (do it on server side too)

export interface INote {
	content: string;
	id: string;
	date: Date;
	likes: number;
}
export interface IEvent {
	name: string;
	id: string;
	description: string;
	dateStart: string;
	dateEnd?: string;
	likes: number;
	important: number;
	notes: INote[];
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
	eventFetching: boolean;
	eventActionFetching: boolean;
	noteFetching: boolean;
}

interface IAction {
	type: string;
	payload: any;
}

const initState = {
	data: {
		events: [],
	},
	isFetching: false,
	eventFetching: false,
	eventActionFetching: false,
	noteFetching: false,
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
					id: action.payload._id,
				},
			};
		}

		case calendarTypes.GET_CALENDAR_SUCCESS: {
			return {
				...state,
				isFetching: false,
				data: {
					...action.payload,
					id: action.payload._id,
				},
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
				eventFetching: true,
			};
		}

		case eventTypes.CREATE_EVENT_SUCCESS: {
			return {
				...state,
				eventFetching: false,
				data: {
					...action.payload,
					id: action.payload._id,
				},
			};
		}

		case eventTypes.CREATE_EVENT_ERROR: {
			return {
				...state,
				eventFetching: false,
			};
		}

		case eventTypes.REMOVE_EVENT:
		case eventTypes.MARK_AS_IMPORTANT: {
			return {
				...state,
				eventActionFetching: true,
			};
		}

		case eventTypes.REMOVE_EVENT_SUCCESS:
		case eventTypes.MARK_AS_IMPORTANT_SUCCESS: {
			return {
				...state,
				eventActionFetching: false,
				data: {
					...action.payload,
					id: action.payload._id,
				},
			};
		}

		case eventTypes.REMOVE_EVENT_ERROR:
		case eventTypes.MARK_AS_IMPORTANT_ERROR: {
			return {
				...state,
				eventActionFetching: false,
			};
		}

		case eventTypes.ADD_NOTE_ERROR:
		case eventTypes.ADD_NOTE: {
			return {
				...state,
				noteFetching: true,
			};
		}

		case eventTypes.ADD_NOTE_SUCCESS: {
			return {
				...state,
				noteFetching: false,
				data: {
					...action.payload,
					id: action.payload._id,
				},
			};
		}

		default:
			return state;
	}
};

export default createReducer;
