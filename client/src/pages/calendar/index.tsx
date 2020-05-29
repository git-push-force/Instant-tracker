import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { getCalendar } from '../../redux/actions/calendar';
import { getPassword } from '../../utils/localStorage';
import { calendarSelector } from '../../redux/selectors/calendar';

import Info from './components/info';
import AddPanel from './components/addPanel';
import Calendar from './components/calendar';
import EventsList from './components/eventList';
import PasswordModal from './components/passwordModal';

const CalendarPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [wrong, setWrong] = useState(false);

    const queryString = qs.parse(location.search.substring(1));
    const { description, isFetching, events, name, id } = useSelector(calendarSelector);

    useEffect(() => {
        (async () => {
            document.title = 'Calendar';

            if (queryString.id) {
                try {
                    await dispatch(getCalendar({
                        id: queryString.id.toString(),
                        password: getPassword()
                    }));
                } catch (err) {
                    const statusCode = err.split(' ')[5];
                    if (statusCode === '401') {
                        setOpen(true);
                        setWrong(false);
                    } else if (statusCode === '400') {
                        setOpen(true);
                        setWrong(true);
                    } else if (statusCode === '404') {
                        history.push('/notExist');
                    }
                }
            } else {
                history.push('/notExist');
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, queryString.id, open]);

    return (
        <>
            <PasswordModal open={open} wrong={wrong} setOpen={setOpen} />
            <Info name={name} description={description} />
            <AddPanel />

            <Row>
                <Col xs={12}  md={7} lg={9}>
                    <Calendar isFetching={isFetching}/>
                </Col>

                <Col xs={12}  md={5} lg={3} className='eventsCol'>
                    <EventsList id={id} events={events} isFetching={isFetching} />
                </Col>
            </Row>
        </>
    )
}

export default CalendarPage;