import React, { createContext, useContext, useState } from 'react';

export const SecretKeyContext = createContext(null);

export function useSecretKey() {
  return useContext(SecretKeyContext);
}

export function SecretKeyProvider({ children }) {
  const [secretKey, setSecretKey] = useState(null);

  return (
    <SecretKeyContext.Provider value={{ secretKey, setSecretKey }}>
      {children}
    </SecretKeyContext.Provider>
  );
}
