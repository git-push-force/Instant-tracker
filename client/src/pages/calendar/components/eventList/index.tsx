import './_eventList.scss';
import React from 'react';
import qs from 'qs';
import { Col } from 'react-bootstrap';
import { Card, Divider, Icon } from '@blueprintjs/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';

import { markAsImportant } from '../../../../redux/actions/event';
import { IEvent } from '../../../../redux/reducers/calendar';
import { getPassword } from '../../../../utils/localStorage';

interface IProps {
    events: IEvent[],
    isFetching: boolean,
    id: string;
}

const EventList = ({ events, isFetching, id }: IProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const redirectToEvent = (eventId: string) => {
        const params = qs.parse(location.search.substring(1));
        const path = `/calendar?id=${params.id}&eventId=${eventId}`
        history.push(path);
    }

    const toggleImportant = (eventId: string, important: boolean | string) => {
    const password = getPassword();
        dispatch(markAsImportant({
            id,
            eventId,
            important: !important,
            password
        }))
    }

    return (
        <Col className='eventList'>
            {isFetching ? (
                <Loader
                    type='Grid'
                    width={35}
                    color='#0f9960'
                />
            ) : (
                <>
                <h3 className={events.length ? '' : 'bp3-text-muted'}>
                    {events.length ? 'Events list' : 'No created events'}
                </h3>
                {events.map((event, index) => {
                    
                    return (
                        <Card 
                            key={index}
                            className={`eventCard ${event.description ? 'withDescription' : ''}`}
                        >
                            <span 
                                className='eventCard_important'
                                onClick={() => toggleImportant(event.id, event.important)}
                            >
                                {event.important === 'true' 
                                ? 
                                <Icon icon='star' iconSize={Icon.SIZE_STANDARD}/> 
                                : 
                                <Icon icon='star-empty' iconSize={Icon.SIZE_STANDARD}/>}
                            </span>

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
                                    {event.dateStart} {event.dateEnd && ` - ${event.dateEnd}`}    
                            </span>
                            {event.description &&( 
                            <>
                                <Divider/>
                                <p className='bp3-text-overflow-ellipsis'>
                                    {event.description}
                                </p>
                            </>
                            )}
                        </Card>
                    )
                })}
                </>
            )}
        </Col>
    )
}

export default EventList;