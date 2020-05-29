import './_calendar.scss';
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Calendar from 'react-calendar';
import { Collapse } from '@blueprintjs/core';

import ToggleButton from '../../../../components/Button/Toggle';

interface IProps {
    isFetching: boolean
}

const CalendarComponent = ({ isFetching }: IProps) => {

    const [isOpen, setOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth > 767) setOpen(true) }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <div className='mainCalendar'>
            {isFetching 
            ? 
            <Loader type='Grid' width={35} color='#0f9960'/>
            :
            <>
                <ToggleButton isOpen={isOpen} setOpen={setOpen}/>

                <Collapse keepChildrenMounted isOpen={isOpen}>
                    <Calendar/>
                </Collapse>
            </>}
        </div>
    )
}

export default CalendarComponent;
