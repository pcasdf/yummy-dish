import React, { useContext } from 'react';

import './footer.styles.scss';
import { ThemeContext } from '../../contexts/theme.context';

const Footer = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme.header === 'black') {
      setTheme({
        header: '#fec368',
        background: '#cbf3f0'
      });
    } else {
      setTheme({
        header: 'black',
        background: '#444'
      });
    }
  };

  return (
    <footer>
      <span onClick={toggleTheme}>About</span>
      <span>Our Business</span>
      <span>Discover</span>
      <span>Languages</span>
    </footer>
  );
};

export default Footer;
