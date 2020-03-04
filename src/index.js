import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './App';
import chartReducer from './store/reducers/chartReducer';
import mapReducer from './store/reducers/mapReducer';
import * as serviceWorker from './serviceWorker';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
  // eslint-disable-next-line global-require
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const combinedReducers = combineReducers({
  chart: chartReducer,
  map: mapReducer,
});

const store = createStore(combinedReducers, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
