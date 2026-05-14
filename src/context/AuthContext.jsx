/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          const result = await authService.verifyToken();
          if (result && result.user) {
            setUser(result.user);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (err) {
          console.error("Auth verification failed:", err);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const register = async (name, email, password) => {
    try {
      setError(null);
      const result = await authService.register(name, email, password);
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const result = await authService.login(email, password);
      setUser(result.user);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    error,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
