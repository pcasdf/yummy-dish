import React from 'react';
import './header.styles.scss';
import { Search, Home, AccountBox, FavoriteBorder } from '@material-ui/icons';

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
        <AccountBox fontSize='large' />
      </span>
    </header>
  );
};

export default Header;
