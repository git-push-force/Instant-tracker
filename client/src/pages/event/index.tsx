import './_event.scss';
import qs from 'qs';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { Card, Icon, InputGroup, Button } from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';

import RedirectButton from '../../components/Button/Redirect';
import { IEvent } from '../../redux/reducers/calendar';
import { addNote } from '../../redux/actions/event';
import { getPassword } from '../../utils/localStorage';

interface IProps {
    events: IEvent[];
    doRequest: Function;
}

const EventPage: React.FC<IProps> = ({ events, doRequest }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const queryString = qs.parse(location.search.substring(1));
    const { eventId, id } = queryString;
    const [activeEvent, setActiveEvent] = useState(events.find(event => event.id === eventId));
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        dispatch(addNote({
            id: id.toString(),
            eventId: eventId.toString(),
            password: getPassword(),
            content: value
        }));
        setValue('');
    }

    useEffect(() => {
        if (!events.length)
            doRequest();
    // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        setActiveEvent(events.find(event => event.id === eventId));
    }, [eventId, events]);

    return (
        <Row>
            <Col className='eventDetails'>
                <Card>
                    <RedirectButton to={`/calendar?id=${id}`} buttonText='Back to calendar'/>
                    <p className='eventDetails__name'>
                        {activeEvent?.name}
                    </p>
                    {activeEvent?.description && (
                    <p className='eventDetails__description'>
                        {activeEvent?.description}
                    </p>
                    )}
                </Card>
                <Card>
                    <div className='eventDetails__addNoteForm'>
                        <Button 
                            icon='add'
                            minimal
                            disabled={!value.trim().length}
                            onClick={handleSubmit}
                        />
                        <InputGroup 
                            value={value} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                            className='bp3-fill'
                            placeholder='Add new note...'
                        />
                    </div>

                    {activeEvent?.notes.map(note => {
                        return (
                            <div className='eventDetails__note'>
                                {note.content}
                                <p className='bp3-text-muted'>
                                    {note.date}
                                </p>
                            </div>
                        )
                    })}
                </Card>
            </Col>
        </Row>
    )
}

export default EventPage;