import copy from 'copy-to-clipboard';
import { notify } from 'react-notify-toast';

interface IValue {
	name: string;
	description: string;
	password: string;
}

export const getInputs = (value: IValue) => {
	return [
		{
			placeholder: 'Calendar name...',
			value: value.name,
			field: 'name'
		},
		{
			placeholder: 'Calendar description...',
			value: value.description,
			field: 'description'
		},
		{
			placeholder: 'Calendar password...',
			value: value.password,
			field: 'password'
		},
	];
};


export const copyText = async (calendarLink: string) => {
	try {
		await copy(calendarLink);
		const color = { background: '#0f9960', text: '#FFFFFF' }
		notify.show('Link copied!', 'custom', 2500, color);
	} catch (err) {
		const color = { background: 'rgb(196, 35, 35)', text: '#FFFFFF' }
		notify.show('Oops, unable to copy', 'custom', 2500, color);
	};
};