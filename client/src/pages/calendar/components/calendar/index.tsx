import './_calendar.scss';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { Collapse, Tag, Intent } from '@blueprintjs/core';

import { setResizeHandler } from '../../../../utils/helpers';
import Loader from '../../../../components/Loader';
import ToggleButton from '../../../../components/Button/Toggle';
import { IEvent } from '../../../../redux/reducers/calendar';
// import ActionsMenu from '../../../../components/ActionsMenu';

interface IProps {
    isFetching: boolean;
    events: IEvent[];
}

const CalendarComponent: React.FC<IProps> = ({ isFetching, events }) => {

    const [isOpen, setOpen] = useState(true);

    const handleDayClick = (date: Date | Date[]) => {
        console.log(date);
    }

    const renderTileContent = (props: CalendarTileProperties) => {
        const { date, view } = props;
        const parsedDate = moment(date).format('YYYY-MM-DD');

        if (view === 'month' && events.find(event => event.dateStart === parsedDate)) {
            return (
                <Tag
                    intent={Intent.SUCCESS}
                    minimal
                >
                    {events.filter(event => event.dateStart === parsedDate).length}
                </Tag>
            )
        }        
        return null;
    };

    const handleClick = (e : React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const [x, y] = [e.clientX, e.clientY];
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
                    <div className='calendarWrapper' onClick={handleClick}>
                        <Calendar 
                            onClickDay={handleDayClick}
                            tileContent={renderTileContent}
                        />
                    </div>
                </Collapse>
            </>
            )}
        </div>
    )
}

export default CalendarComponent;
