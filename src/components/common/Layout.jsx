import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import './layout.scss';

const Layout = ({ children }) => (
  <>
    <div className='app-container'>
      <NavBar />
      <main className='flex-grow children'>{children}</main>
      <Footer className='flex-shrink' />
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
