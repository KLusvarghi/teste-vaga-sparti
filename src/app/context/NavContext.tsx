'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

const NavContext = createContext({});

export const useNavContext = () => useContext(NavContext);

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(false);

  return (
    <NavContext.Provider value={{ active, setActive }}>
      {children}
    </NavContext.Provider>
  );
};
