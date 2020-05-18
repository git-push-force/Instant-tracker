import './_calendar.scss';
import React from 'react';
import { Row } from 'react-bootstrap';

const CalendarComponent: React.FC = () => {
    return (
        <Row className='mainCalendar'>
            <h1>Calendar</h1>
        </Row>
    )
}

export default CalendarComponent;