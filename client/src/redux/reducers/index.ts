import { combineReducers } from 'redux';

import calendar from './calendar';
import { ICalendarReducer } from './calendar';

export interface IRootReducer {
	calendar: ICalendarReducer;
}

export default combineReducers({
	calendar,
});
