import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes/AppRouter';
import { useSetUser } from '../hooks';

import store from '../store';

const App = () => {
  useSetUser({ ...store });
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
};

export default App;
