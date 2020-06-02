import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { doRequest } from './helpers';
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
    const { 
        description, 
        isFetching, 
        events, 
        name, 
        id 
    } = useSelector(calendarSelector);

    const [open, setOpen] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [needSkeleton, setNeedSkeleton] = useState(isFetching || open || wrong);

    const queryString = qs.parse(location.search.substring(1));
    const redirectToNotExist = () => history.push('/notExist');

    useEffect(() => {
        document.title = 'Calendar';
        doRequest(queryString, dispatch, setOpen, setWrong, redirectToNotExist);
        // eslint-disable-next-line
    }, [dispatch, queryString.id]);

    useEffect(() => {
        if (isFetching || open || wrong) {
            return setNeedSkeleton(true);
        }
        setNeedSkeleton(false);
    }, [isFetching, open, wrong]);

    return (
        <>
            <PasswordModal open={open} wrong={wrong} setOpen={setOpen} />
            <Info name={name} description={description} skeleton={needSkeleton} />
            <AddPanel skeleton={needSkeleton} />

            <Row>
                <Col xs={12}  md={7} lg={8}>
                    <Calendar 
                        isFetching={isFetching}
                        events={events}
                    />
                </Col>

                <Col xs={12}  md={5} lg={4}>
                    <EventsList 
                        id={id} 
                        events={events} 
                        isFetching={isFetching} 
                        queryString={queryString}
                        skeleton={needSkeleton}
                        calendarId={id}
                    />
                </Col>
            </Row>
        </>
    )
}

export default CalendarPage;