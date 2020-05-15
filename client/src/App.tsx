import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './assets/scss/index.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Notifications from 'react-notify-toast';

import { ROUTES } from './services/routes';
// import { IRootReducer } from './redux/reducers';

const App: React.FC = () => {
	// const history = useHistory();
	// const calendarState = useSelector((state: IRootReducer) => state.calendar);
	// const { data } = calendarState;

	// useEffect(() => {
	// 	if (!data._id) {
	// 		history.push('/create');
	// 	}
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<>
		<Notifications />

		<Container fluid>
			<Switch>
				{ROUTES().map((item, index) => {
					return (
						<Route key={index} path={item.path} exact={item.exact} component={item.component}/>
					)
				})}
			</Switch>
		</Container>
		</>
	)
}

export default App;
