import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './routes/AppRouter';
import store from './store';
import './main.scss';

const app = document.querySelector('#app');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  app
);
