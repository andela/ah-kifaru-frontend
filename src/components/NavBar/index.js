import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NotificationIcon, AvatarIcon, SearchIcon } from '../../assets/icons';
import './NavBar.scss';
import logo from '../../assets/images/logo.png';

const NavBar = ({ isLoggedIn, user }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="wrapper flex flex-row items-center justify-between pt-2 pb-2 md:pl-10 md:pr-10 sm:pl-4 sm:pr-4">
      <div className="logo flex items-center">
        <Link to="/" title="Error Swag Logo" className="flex items-center">
          <img
            src={logo}
            alt="Errorswag logo"
            className="sm:w-8/12 md:w-full"
          />
        </Link>
      </div>
      <div className="flex">
        <Link to="/search" className="small-button" title="Search">
          <SearchIcon className="h-5 w-5" />
        </Link>
        <Link
          to="/notifications"
          className="small-button"
          title="Notifications"
        >
          <NotificationIcon className="h-6 w-6" />
        </Link>
        <AuthButtons id="auth-buttons" show={!isLoggedIn} />
        <MenuIcon
          id="menu"
          isLoggedIn={isLoggedIn}
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
        />
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  isLoggedIn: false,
  user: {}
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.string)
};

const MenuIcon = ({ isLoggedIn, toggleMenu, menuOpen }) => {
  return isLoggedIn ? (
    <button
      id="avatar"
      className="avatar flex items-center mx-2 focus:outline-none"
      type="button"
      aria-label="Menu"
    >
      <AvatarIcon className="w-8 h-8" />
    </button>
  ) : (
    <button
      id="hamburger"
      onClick={toggleMenu}
      className={`hamburger small-button sm:block md:hidden${
        menuOpen ? ' active' : ''
      }`}
      type="button"
      aria-expanded={menuOpen}
      aria-label="Menu"
    >
      <span />
    </button>
  );
};

MenuIcon.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export const AuthButtons = ({ show }) => {
  return show ? (
    <>
      <Link
        to="/login"
        className="btn btn-medium py-3 px-2 text-primary sm:hidden md:block mr-6"
        title="Login"
      >
        LOGIN
      </Link>

      <Link
        to="/signup"
        className="btn red-button py-3 px-8 sm:hidden md:block"
        title="Signup"
      >
        GET STARTED
      </Link>
    </>
  ) : null;
};

AuthButtons.propTypes = {
  show: PropTypes.bool.isRequired
};

export default NavBar;
