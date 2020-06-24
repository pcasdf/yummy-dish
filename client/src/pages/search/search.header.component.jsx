import React, { useState, useContext, useEffect } from 'react';
import './search.styles.scss';

import { AccountBox, FavoriteBorder, Favorite } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Account from '../account/account.component';
import { UserContext } from '../../contexts/user.context';
import { signinUser } from '../../services/users';
import yummylogo from './yummylogo.png'

const SearchHeader = ({ children }) => {
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
    <div>
      {showModal && <Account {...{ setShowModal, showModal }} />}
      <div className='sheader-wrapper-search'>
        <div className='stopHeader'>
          <Link to='/'>
           
            <img src={yummylogo} className='simgleft' alt="Logo" />
          </Link>

          <div className='sicons-right'>
            <Link to='/bookmarks'>
              {children[0] === 'My Recipes' ? (
                <Favorite fontSize='large' style={{ color: '#fc8b56' }} />
              ) : (
                <FavoriteBorder fontSize='large' />
              )}
            </Link>
            <AccountBox
              className='saccount-icon-search'
              style={{
                color: 'white'
              }}
              onClick={toggleModal}
            />
          </div>
        </div>
        <div className='sheadersearchbar'>{children}</div>
      </div>
    </div>
  );
};

export default SearchHeader;
