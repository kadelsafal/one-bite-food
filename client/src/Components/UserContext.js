import { createContext, useState } from 'react';

export const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <UserContext.Provider value={{ email, setEmail, name, setName }}>
      {children}
    </UserContext.Provider>
  );
};
