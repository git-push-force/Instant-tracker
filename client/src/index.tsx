import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
	</Router>,
	document.getElementById('root')
);

serviceWorker.unregister();
