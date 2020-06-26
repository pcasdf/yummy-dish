import React, { useContext } from 'react';

import './footer.styles.scss';
import { ThemeContext } from '../../contexts/theme.context';

const Footer = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (number) => {
    if (number === 1) {
      setTheme({
        header: '#fec368',
        background: '#cbf3f0'
      });
    } else if (number === 2) {
      setTheme({
        header: 'black',
        background: '#444'
      });
    } else {
      setTheme({
        header: 'green',
        background: '#444'
      });
    }
  };

  return (
    <footer>
      <span onClick={() => toggleTheme(1)}>About</span>
      <span onClick={() => toggleTheme(2)}>Our Business</span>
      <span onClick={() => toggleTheme(3)}>Discover</span>
      <span>Languages</span>
    </footer>
  );
};

export default Footer;
