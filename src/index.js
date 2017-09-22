/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/main';

ReactDOM.render(<App /> , document.querySelector('#main'));

if (module.hot) {
  module.hot.accept();
}