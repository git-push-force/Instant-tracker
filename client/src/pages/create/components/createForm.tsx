import React from 'react';
import { Button, InputGroup, ControlGroup } from "@blueprintjs/core";
import Loader from 'react-loader-spinner';

import { getInputs } from '../helpers';

interface IProps {
    value: {
        name: string,
        password: string,
        description: string
    },
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void,
    handleSubmit: () => void
    isFetching: boolean
}

const CreateForm = ({ value, handleChange, handleSubmit, isFetching}: IProps) => {
    return (
        <>
        <p className='createTitle'>Create new calendar</p>

        <ControlGroup fill={true} vertical>

            {getInputs(value).map((item, index) => {
                return (
                    <InputGroup 
                        key={index}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e, item.field)
                        }}
                        {...item}
                    />
                )
            })}

            <Button 
                type='submit'
                icon={isFetching ? false : 'add'}
                className='bp3-button submitCreate'
                intent='success'
                disabled={(!value.name || isFetching)}
                onClick={handleSubmit}
            >
                {isFetching ? 
                (
                    <Loader
                        type='Grid'
                        height={17}
                        width={65}
                        color='#fff'
                    />
                ) :
                'Create'}
            </Button>
        </ControlGroup>
        </>
    )
}

export default CreateForm;