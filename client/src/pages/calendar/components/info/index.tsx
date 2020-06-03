import './_info.scss';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { Row } from 'react-bootstrap';

interface IProps {
    name: string;
    description?: string;
    skeleton: boolean;
}

const CalendarInfo: React.FC<IProps> = ({ name, description, skeleton }) => {
    const history = useHistory();

    return (
        <Row className='calendarInfo'>
            <Button 
                onClick={() => history.push('/create')}  
                className={skeleton ? 'bp3-skeleton' : ''}
                disabled={skeleton}
            >
                Create new calendar
            </Button>
            <div className='info'>
                <h3 className={`bp3-text-overflow-ellipsis ${skeleton ? 'bp3-skeleton' : ''}`}>
                    Calendar name: {name}
                </h3>

                {description && 
                <h3 className={`bp3-text-overflow-ellipsis ${skeleton ? 'bp3-skeleton' : ''}`}>
                    Calendar description: {description}
                </h3>}
            </div>
        </Row>
    )
}

export default CalendarInfo;