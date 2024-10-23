import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = "http://localhost:5000";


  const verifyUser = async () => {
    const config = {
      url: `${backendUrl}/auth/verify`,
      method: "get",
      withCredentials: true,
    };
    axios(config)
      .then((res) => setAuthUser(res.data))
      .catch((error) => {
        console.error(error);
        setAuthUser(null);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    verifyUser();
  }, []);

  const value = {
    authUser,
    setAuthUser,
    isLoading,
    verifyUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}