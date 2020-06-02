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
    events: IEvent[],
}

const CalendarComponent: React.FC<IProps> = ({ isFetching, events }) => {

    const [isOpen, setOpen] = useState(true);

    const handleDayClick = (date: Date | Date[]) => {
        console.log(date);
    }

    const handleClick = (date: Date | Date[]) => {
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
                    !
                </Tag>
            )
        }
        
        return null;
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
                    <Calendar 
                        onClickDay={handleDayClick}
                        tileContent={renderTileContent}
                    />
                </Collapse>
            </>
            )}
        </div>
    )
}

export default CalendarComponent;
