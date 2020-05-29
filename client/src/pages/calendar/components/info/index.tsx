import './_info.scss';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { Row } from 'react-bootstrap';

interface IProps {
    name: string;
    description?: string
}

const CalendarInfo = ({ name, description }: IProps) => {
    const history = useHistory();

    return (
        <Row className='calendarInfo'>
            <Button onClick={() => history.push('/create')}>
                Create new
            </Button>
            <div className='info'>
                <h3 className='bp3-text-overflow-ellipsis'>Name: {name}</h3>
                {description && <h3 className='bp3-text-overflow-ellipsis'>Description: {description}</h3>}
            </div>
        </Row>
    )
}

export default CalendarInfo;