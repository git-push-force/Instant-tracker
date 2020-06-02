import './_calendar.scss';
import React, { useState, useEffect } from 'react';
import { Collapse } from '@blueprintjs/core';
import Calendar from 'react-calendar';

import { setResizeHandler } from '../../../../utils/helpers';
import Loader from '../../../../components/Loader';
import ToggleButton from '../../../../components/Button/Toggle';
// import ActionsMenu from '../../../../components/ActionsMenu';

interface IProps {
    isFetching: boolean
}

const CalendarComponent: React.FC<IProps> = ({ isFetching }) => {

    const [isOpen, setOpen] = useState(true);
    const handleDayClick = (date: Date | Date[]) => {
        console.log(date);
    }

    useEffect(() => {
        setResizeHandler(setOpen);
    }, []);

    return (
        <div className='mainCalendar '>
            {isFetching ? <Loader/> : (
            <>
                <ToggleButton isOpen={isOpen} setOpen={setOpen}/>

                <Collapse keepChildrenMounted isOpen={isOpen}>
                    <Calendar onClickDay={handleDayClick}/>
                </Collapse>
            </>
            )}
        </div>
    )
}

export default CalendarComponent;
