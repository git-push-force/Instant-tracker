import './_eventList.scss';
import qs from 'qs';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Collapse } from '@blueprintjs/core';

import { markAsImportant, removeEvent } from '../../../../redux/actions/event';
import { getScreenSize, setResizeHandler } from '../../../../utils/helpers';
import { IEvent } from '../../../../redux/reducers/calendar';
import { getPassword } from '../../../../utils/localStorage';

import ToggleButton from '../../../../components/Button/Toggle';
import Loader from '../../../../components/Loader';
import Content from './content';

interface IProps {
    queryString: qs.ParsedQs,
    isFetching: boolean,
    events: IEvent[],
    id: string;
}

const EventList: React.FC<IProps> = ({ events, isFetching, id, queryString }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const screenSize = getScreenSize();
    const [isOpen, setOpen] = useState(screenSize.width > 768);

    const redirectToEvent = (eventId: string) => history.push(`/calendar?id=${queryString.id}&eventId=${eventId}`);
    const removeEventFunc = (eventId: string) => dispatch(removeEvent({ id, eventId, password: getPassword() }));
    const toggleImportant = (eventId: string, important: number) => {
        dispatch(markAsImportant({
            id,
            eventId,
            important: Number(important) ? 0 : 1,
            password: getPassword()
    }))};

    useEffect(() => {
        setResizeHandler(setOpen);
    }, []);

    return (
        <div className='eventList'>

            {isFetching && <Loader />}

            {(!isFetching && !!events.length) && <ToggleButton isOpen={isOpen} setOpen={setOpen}/>}

            {(!isFetching && !events.length) &&

            <h3 className={events.length ? '' : 'bp3-text-muted'}>
                No created events
            </h3>}

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
