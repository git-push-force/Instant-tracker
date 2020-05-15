import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import qs from 'qs';

import { getCalendar } from '../../redux/actions/calendar';
import { getPassword } from '../../utils/localStorage';
import { calendarSelector } from '../../redux/selectors/calendar';

import Info from './components/info';
import AddPanel from './components/addPanel';
import Calendar from './components/calendar';
import EventsList from './components/eventList';

const CalendarPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const queryString = qs.parse(location.search.substring(1));
    const { 
        events,
        isFetching,
        name,
        id
    } = useSelector(calendarSelector);

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
            <Info name={name} id={id}/>

            <AddPanel />

            <Row>
                <Col xs={12} md={9}>
                    <Calendar/>
                </Col>

                <Col xs={12} md={3}>
                    <EventsList events={events} isFetching={isFetching}/>
                </Col>
            </Row>
        </>
    )
}

export default CalendarPage;