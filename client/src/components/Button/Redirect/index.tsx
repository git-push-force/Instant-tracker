import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

interface IProps {
    to: string;
    buttonText: string;
}

const Component: React.FC<IProps> = ({ to, buttonText }) => {
    return (
        <Link to={to}>
            <Button>
                {buttonText}
            </Button>
        </Link>
    );
};

export default Component;