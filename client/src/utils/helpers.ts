import { IEvent } from '../redux/reducers/calendar';
import { confirmAlert } from 'react-confirm-alert';

export const getScreenSize = (): { width: number; height: number } => {
	return {
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	};
};

export const submitAction = (
	event: IEvent,
	title?: string, 
	message?: string, 
	onSubmit?: Function, 
	onReject?: Function) => {
	confirmAlert({
		title,
		message,
		buttons: [
			{ label: 'Yes', onClick: () => onSubmit && onSubmit(event.id) },
			{ label: 'No', onClick: () => onReject && onReject() }
		]
	})
};