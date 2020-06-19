import React from 'react';
import { Search, Home, AccountBox, FavoriteBorder } from '@material-ui/icons';

const Header = ({ children }) => {
  return (
    <div className='header-wrapper'>
      <Search />
      {children}
      <Home />
      <FavoriteBorder />
      <AccountBox />
    </div>
  );
};

export default Header;
