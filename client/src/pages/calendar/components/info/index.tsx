import './_info.scss';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

interface IProps {
    name: string;
    id: string
    description?: string
}

const CalendarInfo = ({ name, id, description }: IProps) => {
    const history = useHistory();

    return (
        <Row className='infoPanel'>
            <Col className='calendarInfo'>
                <Button onClick={() => history.push('/create')}>
                    Create new
                </Button>
                <h3>
                    {name} : {id}
                </h3>
            </Col>
        </Row>
    )
}

export default CalendarInfo;