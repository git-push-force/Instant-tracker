import React from 'react';
import { IEvent } from '../../../../redux/reducers/calendar';
import { Card, Divider, Icon, Button, Popover, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

import { submitAction } from '../../../../utils/helpers';

interface IPropsActionsMenu {
    event: IEvent,
    eventActionFetching: boolean,
    toggleImportant: Function,
    removeEventFunc: Function
}

const ActionsMenu = ({ 
    event, 
    eventActionFetching, 
    toggleImportant, 
    removeEventFunc 
}: IPropsActionsMenu) => {
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

const ImportantIndicator = ({ event }: { event: IEvent }) => {
    return (
        <span>
            {Number(event.important) === 1 
            && 
            <Icon icon='star' iconSize={Icon.SIZE_STANDARD}/>}
        </span>
    )
}

interface IPropsContent {
    events: IEvent[],
    redirectToEvent: Function,
    eventActionFetching: boolean,
    toggleImportant: Function,
    removeEventFunc: Function
}
const EventListContent = ({ 
    events, 
    redirectToEvent, 
    eventActionFetching,
    toggleImportant,
    removeEventFunc
}: IPropsContent) => {
    return (
        <>
        {events.map((event, index) => {                        
            return (
                <Card key={index} className={`eventCard ${event.description ? 'withDescription' : ''}`}>
                    <Popover className='eventCard_actions' content={
                            <ActionsMenu 
                                event={event}
                                eventActionFetching={eventActionFetching}
                                toggleImportant={toggleImportant}
                                removeEventFunc={removeEventFunc}
                            />
                        }>
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

export default EventListContent;