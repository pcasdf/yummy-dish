import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';
import {
  Search,
  Home,
  AccountBox,
  FavoriteBorder,
  Favorite
} from '@material-ui/icons';

import './header.styles.scss';
import Account from '../../pages/account/account.component';
import { UserContext } from '../../contexts/user.context';
import { signinUser } from '../../services/users';

const Header = ({ children }) => {
  const { setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const checkLoggedIn = async () => {
    const token = JSON.parse(localStorage.getItem('jwt-token'));
    if (token) {
      const user = await signinUser(null, token);
      setLoggedOut(false);
      setUser(user);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div>
      {showModal && (
        <Account
          {...{
            setShowModal,
            showModal,
            setLoggedIn,
            setSignedUp,
            setLoggedOut
          }}
        />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={loggedOut}
        autoHideDuration={3000}
        onClose={() => setLoggedOut(!loggedOut)}
      >
        <SnackbarContent
          style={{ backgroundColor: 'rgb(255, 159, 28)', color: 'white' }}
          message='Logged out!'
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={loggedIn}
        autoHideDuration={3000}
        onClose={() => setLoggedIn(!loggedIn)}
      >
        <SnackbarContent
          style={{ backgroundColor: 'rgb(255, 159, 28)', color: 'white' }}
          message='Logged in!'
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={signedUp}
        autoHideDuration={3000}
        onClose={() => setSignedUp(!signedUp)}
      >
        <SnackbarContent
          style={{ backgroundColor: 'rgb(255, 159, 28)', color: 'white' }}
          message='Registered!'
        />
      </Snackbar>
      <header className='header-wrapper'>
        <span className='left'>
          <Search className='SearchIcon' style={{ paddingRight: '1rem' }} />
          <span className='PageTitle'>{children}</span>
        </span>
        <span className='right'>
          <Link to='/'>
            <Home />
          </Link>
          <Link to='/bookmarks'>
            {children.props && children.props.children === 'My Recipes' ? (
              <Favorite style={{ color: '#fc8b56' }} />
            ) : (
              <FavoriteBorder />
            )}
          </Link>
          <AccountBox onClick={toggleModal} />
        </span>
      </header>
    </div>
  );
};

export default Header;
