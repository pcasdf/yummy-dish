import React, { useState } from 'react';
import './header.styles.scss';
import { Search, Home, AccountBox, FavoriteBorder } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import Account from '../../pages/account/account.component';


const Header = ({ children }) => {

  const  [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
     setShowModal(!showModal)
   }

  return (
    <>
      {showModal && <Account />}
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
