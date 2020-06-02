import './_create.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card } from "@blueprintjs/core";

import CreateForm from './components/createForm';
import Created from './components/created';
import { IRootReducer } from '../../redux/reducers';
import { createCalendar } from '../../redux/actions/calendar';
import { savePassword } from '../../utils/localStorage';

const CreatePage: React.FC = () => {
    const dispatch = useDispatch();
    
    const [isCreated, setCreated] = useState(false);
    const calendarState = useSelector((state: IRootReducer) => state.calendar);
    const { isFetching, data } = calendarState;

    const initValue = { name: '', password: '', description: ''};
    const [value, setValue] = useState(initValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => setValue({ ...value, [field]: e.target.value });
    const handleSubmit = async () => {
        try {
            if (value.name.length) await dispatch(createCalendar(value));
            savePassword(value.password);
            setValue(initValue);
            setCreated(true);
        } catch (err) {}
    };

    useEffect(() => {
        document.title = 'Create new calendar';
    }, []);

    return (
        <Row className='createPage'>
            <Col xs={12} sm={10} lg={6}>
                <Card>
                    {!isCreated ? (
                        <CreateForm 
                            value={value}
                            isFetching={isFetching}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                        />
                    ) : (
                        <Created 
                            setCreated={setCreated} 
                            id={data.id}
                        />
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default CreatePage;