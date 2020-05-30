import React, { ReactNode } from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { IconName } from "@blueprintjs/icons";

interface IPropsMenuDivider {
    children: ReactNode[];
    position?: 'before' | 'after' | 'both';
    title?: string;
}
const MenuItemDivider = ({ children, position, title }: IPropsMenuDivider) => {
    return (
        <>
            {(position === 'before' || position === 'both') && <MenuDivider title={title} />}
            {...children}
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
}

export interface IMenuItem {
    text: string;
    clickHandler?: Function;
    icon?: IconName;
    disabled?: boolean;
    dividerPosition?: 'after' | 'before' | 'both';
    haveSubMenu?: boolean;
    subMenuItems?: ISubMenuItem[];
}

interface IPropsActionsMenu {
    items: IMenuItem[];
    large?: boolean;
}
const ActionsMenu = ({ items }: IPropsActionsMenu) => {
    return (
        <Menu>
            {items.map((item, index) => {
                return (
                    <MenuItemDivider position={item.dividerPosition}>
                        {item.haveSubMenu} ? (
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
                        ) : (
                            <MenuItem onClick={() => item.clickHandler && item.clickHandler()} {...item}/>
                        )
                    </MenuItemDivider>
                )
            })}
        </Menu>
    );
};

export default ActionsMenu;
