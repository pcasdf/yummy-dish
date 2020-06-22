import React, { useState, useContext, useEffect } from 'react';
import './header.styles.scss';
import {
  Search,
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
  console.log(children);

  return (
    <>
      {showModal && <Account {...{ setShowModal, showModal }} />}
      <header className='header-wrapper'>
        <span className='left'>
          <Search fontSize='large' style={{ paddingRight: '1rem' }} />
          <span className="PageTitle">{children}</span>

        </span>
        <span className='right'>
          <Link to='/'>
            <Home fontSize='large' />
          </Link>
          <Link to='/bookmarks'>
            {children[0] === 'My Recipes' ? (
              <Favorite fontSize='large' style={{ color: '#fc8b56' }} />
            ) : (
              <FavoriteBorder fontSize='large' />
            )}
          </Link>
          <AccountBox fontSize='large' onClick={toggleModal} />
        </span>
      </header>
    </>
  );
};

export default Header;
