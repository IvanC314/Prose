"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";  


type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  user_id: string | null;
  exquisiteToggle: boolean;
  login: (username: string, user_id: string) => void;
  logout: () => void;
<<<<<<< Updated upstream
  toggleExquisiteMode: () => void;
=======
  toggleExquisiteMode: () => void; 
>>>>>>> Stashed changes
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
<<<<<<< Updated upstream
  const { data: session, status } = useSession();  // session hook from next-auth
  const [exquisiteToggle, setExquisiteToggle] = useState<boolean>(false);

  useEffect(() => {
    // Sync session state with sessionStorage if it's present
    if (session?.user) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", session.user.username || "");
      sessionStorage.setItem("user_id", session.user.id || "");
    } else {
      // Clear sessionStorage if no user is logged in
      sessionStorage.setItem("isLoggedIn", "false");
      sessionStorage.setItem("username", "");
      sessionStorage.setItem("user_id", "");
    }
  }, [session]); // This effect runs when session data changes
=======
  console.log("AuthProvider initialized.");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [user_id, setUserId] = useState<string | null>(null);
  const [exquisiteToggle, setExquisiteToggle] = useState<boolean>(false); 

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    const storedUsername = sessionStorage.getItem("username");
    const storedUserId = sessionStorage.getItem("user_id");
    const storedExquisiteToggle = sessionStorage.getItem("exquisiteToggle");

    if (storedIsLoggedIn === "true" && storedUsername && storedUserId) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserId(storedUserId);
    }
    setExquisiteToggle(storedExquisiteToggle === "true");
  }, []);

  useEffect(() => {
   
    sessionStorage.setItem("isLoggedIn", isLoggedIn.toString());
    sessionStorage.setItem("username", username || "");
    sessionStorage.setItem("user_id", user_id || "");
    sessionStorage.setItem("exquisiteToggle", exquisiteToggle.toString());
  }, [isLoggedIn, username, user_id, exquisiteToggle]);
>>>>>>> Stashed changes

  const login = (username: string, user_id: string) => {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("user_id", user_id);
  };

  const logout = () => {
    signOut({ redirect: false }); // Prevent auto redirect by next-auth
    
    // Clear sessionStorage
    sessionStorage.removeItem("exquisiteToggle");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user_id");

  };

  const toggleExquisiteMode = () => {
    setExquisiteToggle((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: session?.user !== undefined,  // Check if session has user
        username: session?.user?.username || null,
        user_id: session?.user?.id || null,
        exquisiteToggle,
        login,
        logout,
        toggleExquisiteMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
