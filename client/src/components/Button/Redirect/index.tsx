import './_redirect.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@blueprintjs/core';

interface IProps {
    to: string;
    buttonText: string;
}

const Component: React.FC<IProps> = ({ to, buttonText }) => {
    return (
        <Link to={to}>
            <Button minimal className='redirectButtonComponent'>
                <Icon icon='chevron-left'/>
                {buttonText}
            </Button>
        </Link>
    );
};

export default Component;