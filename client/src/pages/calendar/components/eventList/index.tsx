import './_eventList.scss';
import React from 'react';
import { Col } from 'react-bootstrap';
import { Card, Elevation, Divider } from '@blueprintjs/core';
import Loader from 'react-loader-spinner';

import { IEvent } from '../../../../redux/reducers/calendar';

interface IProps {
    events: IEvent[],
    isFetching: boolean
}

const EventList = ({ events, isFetching }: IProps) => {

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
                            className='eventCard' 
                            interactive={true} 
                            elevation={Elevation.ONE}
                        >
                            <p className='bp3-text-large bp3-text-overflow-ellipsis eventName'>
                                {event.name}
                            </p>
                            <p className='bp3-text-muted'>
                                {event.dateStart} {event.dateEnd && ` - ${event.dateEnd}`}
                            </p>
                            <Divider />
                        </Card>
                    )
                })}
                </>
            )}
            

            
        </Col>
    )
}

export default EventList;