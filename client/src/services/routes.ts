import Create from '../pages/create';
import Calendar from '../pages/calendar';

export const ROUTES = (from?: number, to?: number) => {
	const ROUTES = [
		{ path: '/create', exact: true, component: Create },
		{ path: '/calendar', exact: true, component: Calendar },
	];

	return ROUTES;
};
