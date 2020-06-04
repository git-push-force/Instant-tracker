import { IMenuItem } from '../../components/ActionsMenu';

export const getEventMenuItems = (): IMenuItem[] => {
	return [
        {
			text: 'Edit',
			icon: 'edit',
			clickHandler: () => {}
		},
		{
			text: 'Remove event',
			icon: 'trash',
			intent: 'danger',
			dividerPosition: 'before',
			clickHandler: () => {}
		}
	];
};