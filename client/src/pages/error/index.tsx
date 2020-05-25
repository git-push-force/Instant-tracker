import React from 'react';
import { useHistory } from 'react-router-dom';
import { NonIdealState, Button } from '@blueprintjs/core';

const ErrorPage = () => {
    const history = useHistory();
    const description = 'Check your link to calendar and try again';
    const title = 'Sorry, but calendar with this id does not exist';

    return (
        <div>
            <NonIdealState
                icon='timeline-events'
                title={title}
                description={description}
            >
                <Button 
                    intent='success'
                    onClick={() => history.push('/create')}
                >
                    Create new calendar
                </Button>
            </NonIdealState>
        </div>
    )
}

export default ErrorPage;