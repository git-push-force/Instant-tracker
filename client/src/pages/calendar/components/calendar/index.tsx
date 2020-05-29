import './_calendar.scss';
import React, { useState, useEffect } from 'react';
import { Collapse } from '@blueprintjs/core';
import ChevronIcon from '../../../../assets/img/chevron.png';
import Loader from 'react-loader-spinner';
import Calendar from 'react-calendar';

interface IProps {
    isFetching: boolean
}

const CalendarComponent = ({ isFetching }: IProps) => {

    const [isOpen, setOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) setOpen(true);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <div className='mainCalendar'>
            {isFetching ? (
                    <Loader
                        type='Grid'
                        width={35}
                        color='#0f9960'
                    />
                ) : (
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
                        <Calendar/>
                    </Collapse>
                </>
            )}
        </div>
    )
}

export default CalendarComponent;