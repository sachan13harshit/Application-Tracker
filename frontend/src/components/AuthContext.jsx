import React, { useState, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        method: "post",
        data: userData,
        withCredentials: true,
      });
      // Extract user info from response
      setAuthUser({
        name: response.data.name || userData.name,
        email: response.data.email || userData.email,
      });
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        method: "post",
        data: credentials,
        withCredentials: true,
      });
      // Extract user info from response
      setAuthUser({
        name: response.data.name,
        email: response.data.email || credentials.email,
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios({
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        method: "post",
        withCredentials: true,
      });
      setAuthUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    authUser,
    setAuthUser,
    isLoading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}