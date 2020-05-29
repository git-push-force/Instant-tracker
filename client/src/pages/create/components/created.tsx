import React from 'react';
import copy from 'copy-to-clipboard';
import { notify } from 'react-notify-toast';
import { Icon, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

interface IProps {
    id: string;
}

const Created = ({ id }: IProps) => {
    const calendarLink: string = `http://192.168.88.254:3000/calendar?id=${id}`;

    const copyText = async () => {
        try {
            await copy(calendarLink);
            const color = { background: '#0f9960', text: '#FFFFFF' }
            notify.show('Link copied!', 'custom', 2500, color);
        } catch (err) {
            alert(`Oops, unable to copy link`);
        }
    }

    return (
        <div className='bp3-callout createdPage'>
            <h4 className='bp3-heading text-green'>You created new calendar!</h4>
            <p className='calendarLink'>
                {calendarLink}
                <Icon icon='duplicate' onClick={copyText}/>
            </p>

            <p className='bp3-text-muted'>You can get access to calendar by this link*</p>

            <Link to={`/calendar?id=${id}`}>
                <Button rightIcon='arrow-right' intent='success'>Go to calendar</Button>
            </Link>
        </div>
    )
}

export default Created;