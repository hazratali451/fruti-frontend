import useFirebase from "@/src/Hooks/useFirebase";
import React, { createContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allContexts = useFirebase();
  return (
    <AuthContext.Provider value={allContexts}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
