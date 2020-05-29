import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './assets/scss/index.scss';
import './assets/scss/react-calendar.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import React from 'react';
import Notifications from 'react-notify-toast';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { ROUTES } from './services/routes';

const App: React.FC = () => {
	return (
		<Container fluid>
		<Notifications />

			<Switch>
				{ROUTES().map((item, index) => {
					return (
						<Route key={index} path={item.path} exact={item.exact} component={item.component}/>
					)
				})}
				<Route component={() => (
					<Redirect to='/create'/>
				)}/>
			</Switch>
			
		</Container>
	)
}

export default App;
