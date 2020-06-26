import React, { useState, createContext } from 'react';

export const ThemeContext = createContext({
  theme: {},
  setTheme: () => {}
});

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    header: '#fec368'
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
