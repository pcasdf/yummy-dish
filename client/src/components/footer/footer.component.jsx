import React, { useContext } from 'react';

import './footer.styles.scss';
import { ThemeContext } from '../../contexts/theme.context';

const Footer = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (number) => {
    if (number === 1) {
      setTheme({
        header: '#fec368',
        background: '#cbf3f0',
        bookmarkBackground: '#fec368',
        snacks: '#effbfa',
        text: 'black',
        recipeBoxShadow: '-1px 1px 14px -4px rgba(0,0,0,0.75)',
        seeMyRecipeBtn: '#FEC368',
        loginBtn: '#F89A1C',
        recipeText: '#8E8E8E',
        cookModeFooter: 'footerColor',
        prepBG: '#cbf3f0',
        cookBG: 'ADD6B7'
      });
    } else if (number === 2) {
      setTheme({
        header: '#424242',
        background: '#212121',
        bookmarkBackground: '#212121',
        snacks: '#444',
        text: '#f5f5f5',
        recipeBoxShadow: '-1px 1px 14px -4px rgba(255,255,255,1)',
        seeMyRecipeBtn: '#FEC368',
        loginBtn: '#F89A1C',
        recipeText: '#F7F7F7',
        cookModeFooter: '#424242',
        prepBG: '#212121',
        cookBG: '#B1B1B1'
      });
    } else {
      setTheme({
        header: '#00665C',
        background: '#515151',
        bookmarkBackground: '#515151',
        snacks: '#444',
        text: '#f5f5f5',
        recipeBoxShadow: '-1px 1px 14px -4px rgba(255,255,255,1)',
        seeMyRecipeBtn: '#FC8B56',
        loginBtn: '#FC8B56',
        recipeText: '#CFCFCF',
        cookModeFooter: '#00665C',
        prepBG: '#515151',
        cookBG: '#B1B1B1'
      });
    }
  };

  return (
    <footer style={{ background: theme.header }}>
      <span onClick={() => toggleTheme(1)}>About</span>
      <span onClick={() => toggleTheme(2)}>Our Business</span>
      <span onClick={() => toggleTheme(3)}>Discover</span>
      <span>Languages</span>
    </footer>
  );
};

export default Footer;
