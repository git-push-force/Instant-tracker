export const savePassword = (password: string) => {
	sessionStorage.setItem('password', password);
};

export const getPassword = () => {
	const founded = sessionStorage.getItem('password');
	if (founded) return founded;
	return '';
}