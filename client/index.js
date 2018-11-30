/* global process module */
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import Main from './components/main';

const store = configureStore();

const App = () =>
    <Provider store={store}>
        <Main></Main>
    </Provider>;

ReactDOM.render(<App /> , document.querySelector('#main'));

if (module.hot) {
  module.hot.accept();
}