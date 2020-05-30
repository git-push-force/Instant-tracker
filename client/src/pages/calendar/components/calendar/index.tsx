import './_calendar.scss';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Collapse } from '@blueprintjs/core';

import Loader from '../../../../components/Loader';
import ToggleButton from '../../../../components/Button/Toggle';
import { setResizeHandler } from '../../../../utils/helpers';

interface IProps {
    isFetching: boolean
}

const CalendarComponent = ({ isFetching }: IProps) => {

    const [isOpen, setOpen] = useState(true);

    useEffect(() => {
        setResizeHandler(setOpen);
    }, []);

    return (
        <div className='mainCalendar'>
            {isFetching 
            ? 
            <Loader/>
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
