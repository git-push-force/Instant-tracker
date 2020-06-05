import './_addPanel.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputGroup, ControlGroup, Checkbox } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';

import { checkDate, getInputs, clearFields } from '../../helpers';
import { createEvent } from '../../../../redux/actions/event';
import { IRootReducer } from '../../../../redux/reducers';
import { getPassword } from '../../../../utils/localStorage';
import Loader from '../../../../components/Loader';
import { IData } from '../../helpers';

interface IProps {
    skeleton: boolean;
    data: IData;
    setData: React.Dispatch<React.SetStateAction<IData>>
}

const AddPanel: React.FC<IProps> = ({ skeleton, data, setData }) => {
    const dispatch = useDispatch();
    const calendar = useSelector((state: IRootReducer) => state.calendar);

    const [oldValue, setOld] = useState('');

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
                important: data.important ? 1 : 0,
                password: getPassword()
            }));

            clearFields(setData);
        } catch (err) {}
    }

    return (
        <Row className='addPanel'>
            {getInputs().map((group, index) => {
                return (
                    <Col xs={group.size.xs} md={group.size.md} lg={group.size.lg} key={index}>
                        <ControlGroup fill={true} vertical>
                            {group.inputs.map((input, index) => {
                                return (
                                    <InputGroup
                                        key={index}
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
                                        className={skeleton ? 'bp3-skeleton' : ''}
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
                    className={skeleton ? 'bp3-skeleton' : ''}
                >
                    {!calendar.eventFetching && data.name && checkDate(data.dateStart) &&
                    'Create'}
                    
                    {!calendar.eventFetching && (!data.name || !checkDate(data.dateStart)) &&
                    'Fill required fields to create event'}

                    {calendar.eventFetching && <Loader height={10} width={10}/>}
                </Button>
            </Col>

            <Col xs={12} className='optionsCol'>
                <Checkbox
                    checked={data.important}
                    onChange={() => setField('important', !data.important)}
                    className={skeleton ? 'bp3-skeleton' : ''}
                >
                    Mark as important
                </Checkbox>
            </Col>
        </Row>
    )
}

export default AddPanel;