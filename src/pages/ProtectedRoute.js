

import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';


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

export function ProtectedRoute({ children }) {
  const { secretKey } = useSecretKey();

  if (!secretKey) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
