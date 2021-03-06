import './_passwordModal.scss';
import React, { useState } from 'react';
import { Dialog, InputGroup, Tooltip, Button, Intent } from '@blueprintjs/core';
import { savePassword } from '../../../../utils/localStorage';

interface IProps {
    open: boolean;
    wrong: boolean;
    setOpen: Function;
    doRequest: Function;
}

const Modal: React.FC<IProps> = ({ open, wrong, setOpen, doRequest }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState('');

    const handleLockClick = () => setShowPassword(prev => !prev);
    const handleSubmit = () => {
        savePassword(value);
        setOpen(false);
        doRequest();
    }

    const lockButton = (
        <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`}>
            <Button
                disabled={!value.length}
                icon={showPassword ? 'unlock' : 'lock'}
                intent={Intent.WARNING}
                minimal={true}
                onClick={handleLockClick}
            />
        </Tooltip>
    );

    return (
        <Dialog
            isOpen={open}
            title={wrong ? 'Incorrect Password' : 'Provide password to get access to this calendar'}
            icon='error'
            canOutsideClickClose={false}
            isCloseButtonShown={false}
            className='passwordModal'
        >
            <InputGroup
                large={true}
                placeholder='Enter your password...'
                rightElement={lockButton}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />

            <Button intent='success' disabled={!value.length} onClick={handleSubmit}>
                Save password
            </Button>
        </Dialog>
    )
};

export default Modal;