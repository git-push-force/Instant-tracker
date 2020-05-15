import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import { IRootReducer } from '../../redux/reducers';
import { getCalendar } from '../../redux/actions/calendar';
import { getPassword } from '../../utils/localStorage';

import AddPanel from './components/addPanel';

const CalendarPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const queryString = qs.parse(location.search.substring(1));

    const calendarState = useSelector((state: IRootReducer) => state.calendar);
    const { data } = calendarState;

    useEffect(() => {
        const password = getPassword();

        if (queryString.id) {
            dispatch(getCalendar({
                id: queryString.id.toString(),
                password
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <AddPanel />
        </>
    )
}

export default CalendarPage;