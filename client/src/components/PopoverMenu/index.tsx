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
    className?: string;
}

const PopoverMenu: React.FC<IProps> = ({ position, buttonIcon, buttonText, items, className }) => {
    return (
        <Popover
            position={position}
            content={<ActionsMenu items={items}/>}
            className={className}
        >
            <Button icon={buttonIcon} text={buttonText} />
        </Popover>
    )
}

export default PopoverMenu;