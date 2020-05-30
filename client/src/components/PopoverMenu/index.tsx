import React from 'react';
import ActionsMenu from '../ActionsMenu';
import { Popover, Button, Position } from '@blueprintjs/core';
import { IconName } from '@blueprintjs/icons';
import { IMenuItem } from '../ActionsMenu';

interface IProps {
    position?: Position;
    buttonIcon?: IconName;
    buttonText?: string;
    items: IMenuItem[];
}

const Menu = ({ position, buttonIcon, buttonText, items }: IProps) => {
    return (
        <Popover 
            position={position}
            content={<ActionsMenu items={items}/>}
        >
            <Button icon={buttonIcon} text={buttonText} />
        </Popover>
    )
}

export default Menu;