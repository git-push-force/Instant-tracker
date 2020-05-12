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
			field: 'name',
		},
		{
			placeholder: 'Calendar description...',
			value: value.description,
			field: 'description',
		},
		{
			placeholder: 'Calendar password...',
			value: value.password,
			field: 'password',
			// type: 'password'
		},
	];
};
