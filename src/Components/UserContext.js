import { createContext, useState ,useEffect} from 'react';

export const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userRole, setuserRole] = useState('');
  useEffect(() => {
    console.log("userRole:", userRole);
  }, [userRole]);

  return (
    <UserContext.Provider value={{  userRole, setuserRole }}>
      {children}
    </UserContext.Provider>
  );
};
