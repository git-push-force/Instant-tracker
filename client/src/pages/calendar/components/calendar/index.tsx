import './_calendar.scss';
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Collapse } from '@blueprintjs/core';
import ChevronIcon from '../../../../assets/img/chevron.png';
import Loader from 'react-loader-spinner';

import { getScreenSize } from '../../../../utils/helpers';

interface IProps {
    isFetching: boolean
}

const CalendarComponent = ({ isFetching }: IProps) => {

    const screenSize = getScreenSize();
    const [needCollapse] = useState(screenSize.width < 768);
    const [isOpen, setOpen] = useState(true);

    const Content: React.FC = () => {
        return (
            <h3>Opened</h3>
        )
    }

    return (
        <Row className='mainCalendar'>
            {isFetching ? (
                    <Loader
                        type='Grid'
                        width={35}
                        color='#0f9960'
                    />
                ) : (
                <>
                    <h3 className='bp3-text-muted'>Calendar</h3>
                    {needCollapse ? 
                    <>
                        <img 
                            src={ChevronIcon} 
                            alt={isOpen ? 'Arrow close' : 'Arrow open'}
                            onClick={() => setOpen(prev => !prev)}
                            className={`chevronIcon ${isOpen ? 'opened' : ''}`}
                        />
                        <Collapse
                            keepChildrenMounted
                            isOpen={isOpen}
                        >
                            <Content />
                        </Collapse>
                    </>
                    : <Content />
                    }
                </>
            )}
        </Row>
    )
}

export default CalendarComponent;