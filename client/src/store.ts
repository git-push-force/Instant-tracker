import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = composeWithDevTools(middlewareEnhancer);
export const store = createStore(
    rootReducer,
    composedEnhancers
);