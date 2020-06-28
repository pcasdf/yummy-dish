import React, { useState, createContext } from 'react';

export const UserContext = createContext({
  tags: '',
  setTags: () => {},
  user: {},
  setUser: () => {}
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, tags, setTags }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
