import './_event.scss';
import qs from 'qs';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card } from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';

import RedirectButton from '../../components/Button/Redirect';
import { IEvent } from '../../redux/reducers/calendar';

interface IProps {
    events: IEvent[];
    doRequest: Function;
    eventId: number;
}

const EventPage: React.FC<IProps> = ({ events, doRequest, eventId }) => {
    const location = useLocation();
    const queryString = qs.parse(location.search.substring(1));

    useEffect(() => {
        if (!events.length) {
            doRequest();
        }
    }, []);

    return (
        <Row>
            <Col className='eventDetails'>
                <Card>
                    <RedirectButton to={`/calendar?id=${queryString.id}`} buttonText='Back to calendar'/>
                    <h3>{events[eventId]?.name}</h3>
                    <p>{events[eventId]?.description}</p>
                </Card>
            </Col>
        </Row>
    )
}

export default EventPage;