import Create from '../pages/create';
import Calendar from '../pages/calendar';
import ErrorPage from '../pages/error';

export const ROUTES = (from?: number, to?: number) => {
	const ROUTES = [
		{ path: '/create', exact: true, component: Create },
		{ path: '/calendar', exact: true, component: Calendar },
		{ path: '/notExist', exact: false, component: ErrorPage }
	];

	return ROUTES;
};
