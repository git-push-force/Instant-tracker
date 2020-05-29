import { createSelector } from 'reselect';
import { IRootReducer } from '../../reducers';

const getCalendarState = (state: IRootReducer) => state.calendar;

export const calendarSelector = createSelector(
    [getCalendarState],
    (calendarState) => {
        const { 
            data, 
            isFetching,
            eventActionFetching
        } = calendarState;

        const { 
            events,
            name, 
            id,
            description
        } = data;
        
        return {
            events,
            isFetching,
            name,
            id,
            description,
            eventActionFetching
        }
    }
)