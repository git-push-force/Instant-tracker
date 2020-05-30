import React from 'react';
import { Menu, MenuItem, MenuDivider, Intent } from '@blueprintjs/core';
import { IconName } from "@blueprintjs/icons";

interface IPropsMenuDivider {
    position?: 'before' | 'after' | 'both';
    title?: string;
}
const MenuItemDivider: React.FC<IPropsMenuDivider> = ({ children, position, title }) => {
    return (
        <>
            {(position === 'before' || position === 'both') && <MenuDivider title={title} />}
            {children}
            {(position === 'after' || position === 'both') && <MenuDivider title={title}/>}
        </>
    );
};

interface ISubMenuItem {
    text: string;
    clickHandler?: Function;
    icon?: IconName;
    disabled?: boolean;
    dividerPosition?: 'after' | 'before' | 'both';
    intent?: Intent;
}

export interface IMenuItem extends ISubMenuItem {
    haveSubMenu?: boolean;
    subMenuItems?: ISubMenuItem[];
}

interface IPropsActionsMenu {
    items: IMenuItem[];
    large?: boolean;
}
const ActionsMenu: React.FC<IPropsActionsMenu> = ({ items }) => {
    return (
        <Menu>
            {items.map((item, index) => {
                return (
                    <MenuItemDivider position={item.dividerPosition}>
                        {item.haveSubMenu 
                        ? 
                        <MenuItem
                            onClick={() => item.clickHandler && item.clickHandler()}
                            key={index}
                            {...item}
                        >
                            {item.subMenuItems?.map((subItem, index) => {
                                return (
                                    <MenuItem 
                                        onClick={() => subItem.clickHandler && subItem.clickHandler()}
                                        key={index}
                                        {...subItem}
                                    />
                                )
                            })}
                        </MenuItem>
                        : 
                        <MenuItem onClick={() => item.clickHandler && item.clickHandler()} {...item}/>}
                    </MenuItemDivider>
                )
            })}
        </Menu>
    );
};

export default ActionsMenu;
