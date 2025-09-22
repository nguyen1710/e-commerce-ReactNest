import { createContext, useContext, useState, useEffect } from "react";
import {axiosInstance} from "../lib/axios";
import {useNavigate} from 'react-router-dom'
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessTokenState, setAccessTokenState] = useState<string | null>(() => {
    return localStorage.getItem("access_token"); 
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
const [username, setUserName] = useState<string | null>(() => {
    return localStorage.getItem("username"); 
  });

  const setAccessToken = (token: string | null, username: string | null) => {
    if (token) {
        localStorage.setItem("access_token", token)
        localStorage.setItem("username", username)
    }
    else localStorage.removeItem("access_token");
    setAccessTokenState(token);
    setUserName(username)
  };

  // Check token khi App load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");
    if (token) {
      setAccessToken(token, username);
    }
    setIsCheckingAuth(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessTokenState, isCheckingAuth, username, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook tiện lợi để dùng ở component
export const useAuth = () => useContext(AuthContext);