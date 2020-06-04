import './_event.scss';
import qs from 'qs';
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';

import RedirectButton from '../../components/Button/Redirect';
import { IEvent } from '../../redux/reducers/calendar';

interface IProps {
    events: IEvent[];
    doRequest: Function;
}

const EventPage: React.FC<IProps> = ({ events, doRequest }) => {
    const location = useLocation();
    const { eventId, id } = qs.parse(location.search.substring(1));
    const [activeEvent, setActiveEvent] = useState(events.find(event => event.id === eventId));

    useEffect(() => {
        if (!events.length)
            doRequest();
    // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        setActiveEvent(events.find(event => event.id === eventId));
    }, [eventId, events]);

    return (
        <Row>
            <Col className='eventDetails'>
                <Card>
                    <RedirectButton to={`/calendar?id=${id}`} buttonText='Back to calendar'/>
                    <p>
                        Event name: <span>{activeEvent?.name}</span>
                    </p>
                </Card>
            </Col>
        </Row>
    )
}

export default EventPage;