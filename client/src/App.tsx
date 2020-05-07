import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './assets/scss/index.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ROUTES } from './services/routes';
import { checkActiveCalendar } from './utils/localStorage';

import { Container } from 'react-bootstrap';


const App: React.FC = () => {
	return (
		<Router>
			<Provider store={store}>
				<Container fluid>
					<Switch>
						{!checkActiveCalendar() ? <Redirect to='/create'/> : null}
						
						{ROUTES().map(item => {
							return (
								<Route exact={item.exact}  component={item.component}/>
							)
						})}
					</Switch>
				</Container>
			</Provider>
		</Router>
	)
}

export default App;
