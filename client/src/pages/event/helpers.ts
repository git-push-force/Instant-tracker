import { IMenuItem } from '../../components/ActionsMenu';
import { getPassword } from '../../utils/localStorage';

export const getEventMenuItems = (
	id: string,
	eventId: string,
	noteId: string,
	removeNote: Function
): IMenuItem[] => {
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
			clickHandler: () => removeNote({
				id,
				eventId,
				noteId,
				password: getPassword()
			})
		}
	];
};