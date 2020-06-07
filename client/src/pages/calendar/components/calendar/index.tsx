import './_calendar.scss';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { Collapse, Tag, Intent } from '@blueprintjs/core';

import { setResizeHandler } from '../../../../utils/helpers';
import { getDayMenuItems } from '../../helpers';
import { IEvent } from '../../../../redux/reducers/calendar';
import Loader from '../../../../components/Loader';
import ToggleButton from '../../../../components/Button/Toggle';
import PopoverMenu from '../../../../components/PopoverMenu';
import { IData } from '../../helpers';

interface IProps {
    isFetching: boolean;
    events: IEvent[];
    setData: React.Dispatch<React.SetStateAction<IData>>,
    data: IData
}

const CalendarComponent: React.FC<IProps> = ({ isFetching, events, setData, data }) => {

    const [isOpen, setOpen] = useState(true);

    const renderTileContent = (props: CalendarTileProperties) => {
        const { date, view } = props;
        const parsedDate = moment(date).format('YYYY-MM-DD');
        const menuItems = getDayMenuItems(date, setData, data);

        if (view === 'month' && events.find(event => event.dateStart === parsedDate)) {
            return (
                <>
                    <Tag
                        intent={Intent.SUCCESS}
                        minimal
                    >
                        {events.filter(event => event.dateStart === parsedDate).length}
                    </Tag>
                    <PopoverMenu items={menuItems} className='calendarTileMenu'/>
                </>
            )
        }
        if (view === 'month') {
            return (
                <PopoverMenu items={menuItems} className='calendarTileMenu'/>
            );
        };
        return null;
    };

    useEffect(() => {
        setResizeHandler(setOpen);
    }, []);

    return (
        <div className='mainCalendar '>
            {isFetching ? <Loader/> : (
            <>
                <ToggleButton isOpen={isOpen} setOpen={setOpen}/>

                <Collapse keepChildrenMounted isOpen={isOpen}>
                    <Calendar tileContent={renderTileContent}/>
                </Collapse>
            </>
            )}
        </div>
    )
}

export default CalendarComponent;
