import React, { useState, useContext, useEffect } from 'react';
import './header.styles.scss';
import { Search, Home, AccountBox, FavoriteBorder } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Account from '../../pages/account/account.component';
import { UserContext } from '../../contexts/user.context';
import { signinUser } from '../../services/users';

const Header = ({ children }) => {
  const { setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const checkLoggedIn = async () => {
    const token = JSON.parse(localStorage.getItem('jwt-token'));
    if (token) {
      const user = await signinUser(null, token);
      setUser(user);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      {showModal && <Account {...{ setShowModal, showModal }} />}
    <header className='header-wrapper'>
      <span className='left'>
        <Search fontSize='large' style={{ paddingRight: '1rem' }} />
        {children}
      </span>
      <span className='right'>
        <Home fontSize='large' />
        <FavoriteBorder fontSize='large' />
        {/* <Link to="/login"> */}
          <AccountBox fontSize='large' onClick={toggleModal} />
          {/* </Link> */}
        </span>
      </header>
    </>
  );
};

export default Header;
