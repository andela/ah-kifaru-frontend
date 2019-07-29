import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './main.scss';

const app = document.querySelector('#app');

render(<App />, app);
