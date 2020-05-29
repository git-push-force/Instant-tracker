import './_eventList.scss';
import qs from 'qs';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Divider, Icon, Collapse, Button, Menu, MenuDivider, MenuItem, Popover } from '@blueprintjs/core';
import Loader from 'react-loader-spinner';
import { confirmAlert } from 'react-confirm-alert';

import { markAsImportant, removeEvent } from '../../../../redux/actions/event';
import { IEvent } from '../../../../redux/reducers/calendar';
import { getPassword } from '../../../../utils/localStorage';
import { getScreenSize } from '../../../../utils/helpers';
import ToggleButton from '../../../../components/Button/Toggle';

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

    const submitAction = (
        event: IEvent,
        title?: string, 
        message?: string, 
        onSubmit?: Function, 
        onReject?: Function) => {
        confirmAlert({
            title,
            message,
            buttons: [
                { label: 'Yes', onClick: () => onSubmit && onSubmit(event.id) },
                { label: 'No', onClick: () => onReject && onReject() }
            ]
        })
    };

    const ImportantIndicator = ({ event }: { event: IEvent }) => {
        return (
            <span>
                {Number(event.important) === 1 
                && 
                <Icon icon='star' iconSize={Icon.SIZE_STANDARD}/>}
            </span>
        )
    }

    const ActionsMenu = ({ event }: { event: IEvent }) => {
        return (
            <Menu>
                <MenuItem
                    icon={Number(event.important) === 1 ? 'star-empty' : 'star'}
                    text={`Mark as ${Number(event.important) === 1 ? 'unimportant' : 'important'}`}
                    disabled={eventActionFetching}
                    onClick={() => toggleImportant(event.id, event.important)}
                />
                <MenuDivider />
                <MenuItem
                    icon='trash'
                    text='Remove event'
                    disabled={eventActionFetching}
                    onClick={() => submitAction(
                        event,
                        'Confirm to delete',
                        'Are you sure want to remove event?',
                        removeEventFunc)}
                />
            </Menu>
        )
    };

    const Content: React.FC = () => {
        return (
            <>
            {events.map((event, index) => {                        
                return (
                    <Card key={index} className={`eventCard ${event.description ? 'withDescription' : ''}`}>
                        <Popover className='eventCard_actions' content={<ActionsMenu event={event}/>}>
                            <Button icon='layout-linear'/>
                        </Popover>

                        <span 
                            className='eventCard_more' 
                            onClick={() => redirectToEvent(event.id)}
                        >
                            <Icon icon='chevron-right' iconSize={36}/>
                        </span>

                        <p className='bp3-text-large bp3-text-overflow-ellipsis eventName'>
                            {event.name}
                        </p>

                        <span className='bp3-text-muted'>
                            {event.dateStart} {event.dateEnd && ` - ${event.dateEnd}`} <ImportantIndicator event={event}/>
                        </span>

                        {event.description &&( 
                        <>
                            <Divider/>
                            <p className='bp3-text-overflow-ellipsis'>{event.description}</p>
                        </>
                        )}
                    </Card>
                )
            })}
            </>
        )
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) return setOpen(true);
            setOpen(false);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return (
        <div className='eventList'>
            {isFetching ? (
                <Loader
                    type='Grid'
                    width={35}
                    color='#0f9960'
                />
            ) : (
                events.length 
                ?
                <ToggleButton isOpen={isOpen} setOpen={setOpen}/>
                : 
                <h3 className={events.length ? '' : 'bp3-text-muted'}>No created events</h3>
            )}
            <Collapse keepChildrenMounted isOpen={isOpen}>
                <Content />
            </Collapse>
        </div>
    )
}

export default EventList;
