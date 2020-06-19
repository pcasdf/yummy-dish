import React, { useState, createContext } from 'react';

export const UserContext = createContext({
  user: {},
  setUser: () => {},
  bookmarks: [],
  setBookmarks: () => {}
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, bookmarks, setBookmarks }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
