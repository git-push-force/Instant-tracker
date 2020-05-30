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

export const setResizeHandler = (
	setOpen: (value: React.SetStateAction<boolean>) => void
) => {
	const handleResize = () => { 
		if (window.innerWidth > 767) setOpen(true);
	}
	window.addEventListener('resize', handleResize);
	return () => window.removeEventListener('resize', handleResize);
};