"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  console.log("AuthProvider initialized."); // Debugging log

  // Initialize state from sessionStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effect to sync state with sessionStorage
  useEffect(() => {
    const storedLoginState = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLoginState);
    console.log("isLoggedIn on mount:", storedLoginState); // Debugging log
  }, []);

  // Effect to log the updated `isLoggedIn` state whenever it changes
  useEffect(() => {
    console.log("Updated isLoggedIn:", isLoggedIn); // Logs the updated state after any changes
  }, [isLoggedIn]); // This effect runs every time isLoggedIn changes

  // Login function
  const login = () => {
    console.log("Logging in..."); // Debugging log
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true"); // Store in sessionStorage
    console.log("Logged in!"); // Debugging log
  };

  // Logout function
  const logout = () => {
    console.log("Logging out..."); // Debugging log
    setIsLoggedIn(false);
    sessionStorage.setItem("isLoggedIn", "false"); // Store in sessionStorage
    console.log("Logged out!"); // Debugging log
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
