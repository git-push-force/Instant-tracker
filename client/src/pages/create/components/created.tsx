import React from 'react';
import { Icon, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import { copyText } from '../helpers';
import { HOST } from '../../../services/request';

interface IProps {
    id: string;
    setCreated: Function;
}

const Created: React.FC<IProps> = ({ id, setCreated }) => {
    const calendarLink: string = `${HOST}/calendar?id=${id}`;

    return (
        <div className='bp3-callout createdPage'>
            <h4 className='bp3-heading text-green'>You created new calendar!</h4>
            <p className='calendarLink'>
                {calendarLink}
                <Icon icon='duplicate' onClick={() => copyText(calendarLink)}/>
            </p>

            <p className='bp3-text-muted'>You can get access to calendar by this link*</p>

            <Link 
                to={`/calendar?id=${id}`}
                onClick={() => setCreated(false)}
            >
                <Button rightIcon='arrow-right' intent='success'>Go to calendar</Button>
            </Link>
        </div>
    )
}

export default Created;