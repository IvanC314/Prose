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
  toggleExquisiteMode: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();  
  const [exquisiteToggle, setExquisiteToggle] = useState<boolean>(false);

  useEffect(() => {
   
    if (session?.user) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", session.user.username || "");
      sessionStorage.setItem("user_id", session.user.id || "");
    } else {
      
      sessionStorage.setItem("isLoggedIn", "false");
      sessionStorage.setItem("username", "");
      sessionStorage.setItem("user_id", "");
    }
  }, [session]); 

  const login = (username: string, user_id: string) => {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("user_id", user_id);
  };

  const logout = () => {
    signOut({ redirect: false }); 
    
    
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
        isLoggedIn: session?.user !== undefined,  
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
