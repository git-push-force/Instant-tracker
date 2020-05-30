import React from 'react';
import { Card, Divider, Icon } from '@blueprintjs/core';

import { IEvent } from '../../../../redux/reducers/calendar';
import PopoverMenu from '../../../../components/PopoverMenu';
import { submitAction } from '../../../../utils/helpers';
import { getEventMenuItems } from '../../helpers';

interface IPropsContent {
    events: IEvent[],
    redirectToEvent: Function,
    toggleImportant: Function,
    removeEventFunc: Function
}

const EventListContent: React.FC<IPropsContent> = ({ 
    events, 
    redirectToEvent, 
    toggleImportant,
    removeEventFunc
}) => {
    return (
        <>
        {events.map((event, index) => {
            const menuItems = getEventMenuItems(event, toggleImportant, submitAction, removeEventFunc);

            return (
                <Card key={index} className={`eventCard ${event.description ? 'withDescription' : ''}`}>
                    <PopoverMenu
                        buttonIcon='layout-linear'
                        className='eventCard_actions'
                        items={menuItems}
                    />

                    <span className='eventCard_more' onClick={() => redirectToEvent(event.id)}>
                        <Icon icon='chevron-right' iconSize={36}/>
                    </span>

                    <p className='bp3-text-large bp3-text-overflow-ellipsis eventName'>
                        {event.name}
                    </p>

                    <span className='bp3-text-muted'>
                        {event.dateStart} {event.dateEnd && ` - ${event.dateEnd}`}
                        {Number(event.important) && <Icon icon='star' iconSize={Icon.SIZE_STANDARD}/>}
                    </span>

                    {event.description && <Divider/>}
                    <p className='bp3-text-overflow-ellipsis'>{event.description}</p>
                </Card>
            )
        })}
        </>
    );
};

export default EventListContent;