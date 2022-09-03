import { createContext, useContext, useState } from 'react';

const UserContext = createContext({});

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  const handleCurrentUser = (user) => {
    setCurrentUser({ ...user });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ currentUser, handleCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
