import React, { useState, createContext, useEffect, useRef } from 'react';



export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [role, setRole] = useState('');
  const [isAdmin,setIsAdmin] = useState(false)


  return (
    <AppContext.Provider
      value={{
        setRole,
        role,
        isAdmin,
        setIsAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
