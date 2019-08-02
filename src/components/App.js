import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes/AppRouter';
import Footer from './Footer/Footer';

const App = () => {
  return (
    <Router>
      <Routes />
      <Footer />
    </Router>
  );
};

export default App;
