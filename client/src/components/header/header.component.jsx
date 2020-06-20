import React from 'react';
import './header.styles.scss';
import { Search, Home, AccountBox, FavoriteBorder } from '@material-ui/icons';
import { Link } from 'react-router-dom'

const Header = ({ children }) => {
  return (
    <header className='header-wrapper'>
      <span className='left'>
        <Search fontSize='large' style={{ paddingRight: '1rem' }} />
        {children}
      </span>
      <span className='right'>
        <Home fontSize='large' />
        <FavoriteBorder fontSize='large' />
        <Link to="/login">
          <AccountBox fontSize='large' />
          </Link>
      </span>
    </header>
  );
};

export default Header;
