export const savePassword = (password: string) => {
	sessionStorage.setItem('password', password);
};
