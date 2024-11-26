"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  user_id: string | null;
  login: (username: string, user_id: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  console.log("AuthProvider initialized.");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [user_id, setUserId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false); // Ensures state is properly initialized before using it

  // On mount, check sessionStorage and set initial state
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only check sessionStorage after initial render
      const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
      const storedUsername = sessionStorage.getItem("username");
      const storedUserId = sessionStorage.getItem("user_id");

      if (storedIsLoggedIn === "true" && storedUsername && storedUserId) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
        setUserId(storedUserId);
      } else {
        setIsLoggedIn(false);
        setUsername(null);
        setUserId(null);
      }
    }
    setIsInitialized(true); // Mark initialization as complete
  }, []); // This only runs once when the component is mounted

  // Sync changes to sessionStorage when state updates
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      sessionStorage.setItem("isLoggedIn", isLoggedIn.toString());
      sessionStorage.setItem("username", username || "");
      sessionStorage.setItem("user_id", user_id || "");
      console.log("isLoggedIn, username, and user_id updated and saved to sessionStorage:", isLoggedIn, username, user_id);
    }
  }, [isLoggedIn, username, user_id, isInitialized]);

  const login = (username: string, user_id: string) => {
    console.log("Logging in...");
    setIsLoggedIn(true);
    setUsername(username);
    setUserId(user_id);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("user_id", user_id);
    }
    console.log("Logged in!");
  };

  const logout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    setUsername(null);
    setUserId(null);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isLoggedIn", "false");
      sessionStorage.setItem("username", "");
      sessionStorage.setItem("user_id", "");
    }
    console.log("Logged out!");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, user_id, login, logout }}>
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
