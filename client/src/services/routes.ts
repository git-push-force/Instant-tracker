import Create from '../pages/create';
import Calendar from '../pages/calendar';
import ErrorPage from '../pages/error';

export const ROUTES = () => {
	return [
		{ path: '/create', exact: true, component: Create },
		{ path: '/calendar', exact: true, component: Calendar },
		{ path: '/notExist', exact: false, component: ErrorPage }
	];
};
