import moment from 'moment';
import { IMenuItem } from '../../components/ActionsMenu';
import { IEvent } from '../../redux/reducers/calendar';
import { getCalendar } from '../../redux/actions/calendar';
import { getPassword } from '../../utils/localStorage';
import { notify } from 'react-notify-toast';
import copy from 'copy-to-clipboard';
import { HOST } from '../../services/request';

export const checkDate = (date: string): boolean => moment(date, 'YYYY-MM-DD', true).isValid();

	//Get fields for add event panel
interface IInput {
	placeholder: string;
	name: string;
	checkDate?: boolean;
}
interface IGroup {
	size: {
		xs: number;
		md: number;
		lg: number;
	};
	inputs: IInput[];
}
export const getInputs = (): IGroup[] => {
	return [
		{
			size: {
				xs: 12,
				md: 7,
				lg: 8,
			},

			inputs: [
				{
					placeholder: 'Name of event *',
					name: 'name',
				},
				{
					placeholder: 'Description of event',
					name: 'description',
				},
			],
		},

		{
			size: {
				xs: 12,
				md: 3,
				lg: 2,
			},

			inputs: [
				{
					placeholder: 'Start of event *',
					name: 'dateStart',
					checkDate: true,
				},
				{
					placeholder: 'End of event',
					name: 'dateEnd',
					checkDate: true,
				},
			],
		},
	];
};

	//Clear add event panel fields
export const clearFields = (
	setData: React.Dispatch<
		React.SetStateAction<{
			dateStart: string;
			dateEnd: string;
			name: string;
			description: string;
			important: boolean;
		}>
	>
) => {
	setData({
		dateStart: moment(new Date()).format('YYYY-MM-DD'),
		dateEnd: '',
		name: '',
		description: '',
		important: false,
	});
};

	//Get fields for event card menu
export const getEventMenuItems = (
	event: IEvent, 
	toggleImportant: Function,
	submitAction: Function,
	removeEventFunc: Function,
	calendarId: string
	): IMenuItem[] => {
	return [
		{
			text: 'Copy link to event',
			icon: 'duplicate',
			clickHandler: async () => {
				await copy(`${HOST}/calendar?id=${calendarId}&eventId=${event.id}`);
				const color = { background: '#0f9960', text: '#FFFFFF' }
				notify.show('Link copied!', 'custom', 2500, color);
			}
		},
		{
			text: `Mark as ${Number(event.important) ? 'unimportant' : 'important'}`,
			icon: Number(event.important) ? 'star-empty' : 'star',
			clickHandler: () => toggleImportant(event.id, event.important)
		}, 
		{
			text: 'Remove event',
			icon: 'trash',
			intent: 'danger',
			dividerPosition: 'before',
			clickHandler: () => submitAction(
				event,
				'Confirm to delete',
				'Are you sure want to remove event?',
				removeEventFunc)
		}
	];
};

	//Request on first render and handling errors
export const doRequest = async (
	queryString: qs.ParsedQs,
	dispatch: React.Dispatch<Object>,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setWrong: React.Dispatch<React.SetStateAction<boolean>>,
	redirect: Function
) => {
	if (queryString.id) {

		try {
			await dispatch(getCalendar({
				id: queryString.id.toString(),
				password: getPassword()
			}));

		} catch (err) {
			const statusCode = err.split(' ')[5];

			switch (statusCode) {
				case '401': {
					setOpen(true);
					setWrong(false);
					break;
				}
				case '400': {
					setOpen(true);
					setWrong(true);
					break;
				}
				case '404': {
					redirect();
					break;
				}
			}
		}
	} else {
		redirect();
	}
}

	//Get fields for calendar day menu