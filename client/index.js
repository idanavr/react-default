/* global process module */
import React from 'react';
import ReactDOM from 'react-dom';

import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware ,createStore } from 'redux';
import Main from './components/main';

const middlewares = [ReduxThunk];
if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
    console.log(process.env);
}
const middleware = applyMiddleware(...middlewares);
const store = createStore(rootReducer, { }, middleware);

const App = () =>
    <Provider store={store}>
        <Main></Main>
    </Provider>;

ReactDOM.render(<App /> , document.querySelector('#main'));

if (module.hot) {
  module.hot.accept();
}