import moment from 'moment';
import { IMenuItem } from '../../components/ActionsMenu';
import { IEvent } from '../../redux/reducers/calendar';

export const checkDate = (date: string): boolean =>
	moment(date, 'YYYY-MM-DD', true).isValid();

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

export const getEventMenuItems = (
	event: IEvent, 
	toggleImportant: Function,
	submitAction: Function,
	removeEventFunc: Function
	): IMenuItem[] => {
	return [
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