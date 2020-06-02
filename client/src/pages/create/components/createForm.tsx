import React from 'react';
import { Button, InputGroup, ControlGroup, Icon } from "@blueprintjs/core";

import { getInputs } from '../helpers';
import Loader from '../../../components/Loader';

interface IProps {
    value: {
        name: string,
        password: string,
        description: string
    },
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void,
    handleSubmit: () => void
    isFetching: boolean;
}

const CreateForm: React.FC<IProps> = ({ value, handleChange, handleSubmit, isFetching }) => {
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
                className='bp3-button submitCreate'
                intent='success'
                disabled={(!value.name || isFetching)}
                onClick={handleSubmit}
            >
                {isFetching ? <Loader width={65} height={10}  color='#fff'/> : (
                    <>
                        <span>Create</span>
                        {<Icon icon='arrow-right'/>}
                    </>
                )}
            </Button>
        </ControlGroup>
        </>
    )
}

export default CreateForm;