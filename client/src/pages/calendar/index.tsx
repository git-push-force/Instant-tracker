import React from 'react';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../../redux/reducers';

const CalendarPage: React.FC = () => {
    const calendarState = useSelector((state: IRootReducer) => state.calendar);
    const { data } = calendarState;

    return (
        <h1>
            Calendar page || id: {data._id}
        </h1>
    )
}

export default CalendarPage;