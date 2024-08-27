import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const authUserString = localStorage.getItem("authUser");

  let initialAuthUser = null;

  if (authUserString) {
    try {
      initialAuthUser = JSON.parse(authUserString);
    } catch (error) {}
  }

  const [authUser, setAuthUser] = useState(initialAuthUser);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
