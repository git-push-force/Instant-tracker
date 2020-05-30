import React from 'react';
import { Icon } from '@blueprintjs/core';

interface IProps {
    isOpen: boolean,
    setOpen: Function,
    size?: number
}

const ToggleButton: React.FC<IProps> = ({ setOpen, isOpen, size }) => {
    return (
        <Icon 
            icon='chevron-up' 
            iconSize={size ? size : 28}
            onClick={() => setOpen(() => !isOpen)}
            className={`chevronIcon ${isOpen ? 'opened' : ''}`}
        />
    )
}

export default ToggleButton;