"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  console.log("AuthProvider initialized.");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // On mount, reset the auth state and sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isLoggedIn", "false"); // Reset to false on app load
      setIsLoggedIn(false); // Ensure state is false initially
      console.log("Resetting isLoggedIn to nonauthenticated state.");
    }
    setIsInitialized(true); // Mark initialization as complete
  }, []);

  // Sync changes to sessionStorage when `isLoggedIn` updates
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      sessionStorage.setItem("isLoggedIn", isLoggedIn.toString());
      console.log("isLoggedIn updated and saved to sessionStorage:", isLoggedIn);
    }
  }, [isLoggedIn, isInitialized]);

  const login = () => {
    console.log("Logging in...");
    setIsLoggedIn(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isLoggedIn", "true");
    }
    console.log("Logged in!");
  };

  const logout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isLoggedIn", "false");
    }
    console.log("Logged out!");
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
