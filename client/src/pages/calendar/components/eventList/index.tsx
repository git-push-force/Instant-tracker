import './_eventList.scss';
import qs from 'qs';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Collapse } from '@blueprintjs/core';

import { markAsImportant, removeEvent } from '../../../../redux/actions/event';
import { getScreenSize, setResizeHandler } from '../../../../utils/helpers';
import { IEvent } from '../../../../redux/reducers/calendar';
import { getPassword } from '../../../../utils/localStorage';

import ToggleButton from '../../../../components/Button/Toggle';
import Content from './content';
import Loader from '../../../../components/Loader';

interface IProps {
    events: IEvent[],
    isFetching: boolean,
    id: string;
    eventActionFetching: boolean;
}

const EventList = ({ events, isFetching, id, eventActionFetching }: IProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const screenSize = getScreenSize();
    const [isOpen, setOpen] = useState(screenSize.width > 768);

    const redirectToEvent = (eventId: string) => {
        const params = qs.parse(location.search.substring(1));
        const path = `/calendar?id=${params.id}&eventId=${eventId}`
        history.push(path);
    }

    const toggleImportant = (eventId: string, important: number) => {
        dispatch(markAsImportant({
            id,
            eventId,
            important: Number(important) ? 0 : 1,
            password: getPassword()
        }));
    }

    const removeEventFunc = (eventId: string) => {
        dispatch(removeEvent({ id, eventId, password: getPassword() }));
    }

    useEffect(() => {
        setResizeHandler(setOpen);
    }, []);

    return (
        <div className='eventList'>
            {isFetching ? (
                <Loader/>
            ) : (
                events.length
                ?
                <ToggleButton isOpen={isOpen} setOpen={setOpen}/>
                : 
                <h3 className={events.length ? '' : 'bp3-text-muted'}>No created events</h3>
            )}
            <Collapse keepChildrenMounted isOpen={isOpen}>
                <Content
                    events={events}
                    redirectToEvent={redirectToEvent}
                    toggleImportant={toggleImportant}
                    removeEventFunc={removeEventFunc}
                />
            </Collapse>
        </div>
    )
}

export default EventList;
