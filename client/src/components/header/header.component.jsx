import React, { useState, useContext, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import './header.styles.scss';

import {
  Search as SearchIcon,
  Home,
  AccountBox,
  FavoriteBorder,
  Favorite
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
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
  console.log(children);

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
        message='Logged out!'
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={loggedIn}
        autoHideDuration={3000}
        onClose={() => setLoggedIn(!loggedIn)}
        message='Logged in!'
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={signedUp}
        autoHideDuration={3000}
        onClose={() => setSignedUp(!signedUp)}
        message='Registered!'
      />
      <header className='header-wrapper'>
        <span className='left'>
          <SearchIcon className='SearchIcon' style={{ paddingRight: '1rem' }} />
          <span className='PageTitle'>{children}</span>
        </span>
        <span className='right'>
          <Link to='/'>
            <Home />
          </Link>
          <Link to='/bookmarks'>
            {children[0].props &&
            children[0].props.children === 'My Recipes' ? (
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
