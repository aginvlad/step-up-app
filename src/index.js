import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth/auth';
import goalsListReducer from './store/reducers/GoalsList/goalsList';
import dashboardReducer from './store/reducers/Dashboard/dashboard';
import { BrowserRouter } from 'react-router-dom';
import './normalize.css';
import './assets/font-awesome/css/all.min.css';
import './variables.sass';
import './index.sass';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  auth: authReducer,
  goalsList: goalsListReducer,
  dashboard: dashboardReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
