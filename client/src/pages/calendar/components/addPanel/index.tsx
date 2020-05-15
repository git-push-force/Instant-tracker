import './_addPanel.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Button, InputGroup, ControlGroup, Checkbox } from '@blueprintjs/core';
import Loader from 'react-loader-spinner';

import { checkDate, getInputs, clearFields } from '../../helpers';
import { createEvent } from '../../../../redux/actions/event';
import { IRootReducer } from '../../../../redux/reducers';

const AddPanel: React.FC = () => {
    const dispatch = useDispatch();
    const calendar = useSelector((state: IRootReducer) => state.calendar);

    const [oldValue, setOld] = useState('');
    const [data, setData] = useState({
        dateStart: '',
        dateEnd: '',
        name: '',
        description: '',
        important: false
    });

    const setField = (fieldName: string, event: React.ChangeEvent<HTMLInputElement> | string | boolean): void => {
        if (typeof event === 'string' || typeof event === 'boolean') {
            setData({ ...data, [fieldName]: event });
        } else {
            setData({ ...data, [fieldName]: event.target.value});
        }
    }

    const handleSubmit = async () => {
        try {
            await dispatch(createEvent({
                ...data,
                id: calendar.data.id,
                password: calendar.data.password
            }));

            clearFields(setData);
        } catch (err) {}
    }

    return (
        <Row className='addPanel'>

            {getInputs().map(group => {
                return (
                    <Col xs={group.size.xs} md={group.size.md} lg={group.size.lg}>
                        <ControlGroup fill={true} vertical>
                            {group.inputs.map(input => {
                                return (
                                    <InputGroup
                                        placeholder={input.placeholder}
                                        // @ts-ignore
                                        value={data[input.name]}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField(input.name, e)}
                                        // @ts-ignore
                                        onFocus={() => {if(input.checkDate) setOld(data[input.name])}}
                                        onBlur={() => {
                                            // @ts-ignore
                                            if (input.checkDate && !checkDate(data[input.name]))
                                                setField(input.name, oldValue)
                                        }}
                                    />
                                )
                            })}
                        </ControlGroup>
                    </Col>
                )
            })}

            <Col xs={12} md={2}>
                <Button 
                    disabled={!(data.name && checkDate(data.dateStart))}
                    onClick={handleSubmit}
                >
                    {!calendar.eventFetching && data.name && checkDate(data.dateStart) && 'Create'}
                    
                    {!calendar.eventFetching && (!data.name || !checkDate(data.dateStart)) && 'Fill fields to create event'}

                    {calendar.eventFetching && (
                        <Loader
                            type='Grid'
                            height={17}
                            width={20}
                            color='#0f9960'
                        />
                    )}
                </Button>
            </Col>

            <Col xs={12}>
                <Checkbox
                    checked={data.important}
                    onChange={() => setField('important', !data.important)}
                >
                    Mark as important
                </Checkbox>
            </Col>
        </Row>
    )
}

export default AddPanel