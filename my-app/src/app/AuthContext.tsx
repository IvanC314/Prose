// "use client";

// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// type AuthContextType = {
//   isLoggedIn: boolean;
//   username: string | null;
//   user_id: string | null;
//   exquisiteToggle: boolean;
//   login: (username: string, user_id: string) => void;
//   logout: () => void;
//   toggleExquisiteMode: () => void; // New function
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   console.log("AuthProvider initialized.");

//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [username, setUsername] = useState<string | null>(null);
//   const [user_id, setUserId] = useState<string | null>(null);
//   const [exquisiteToggle, setExquisiteToggle] = useState<boolean>(false); // New state

//   useEffect(() => {
//     // Initialize state from sessionStorage or defaults
//     const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
//     const storedUsername = sessionStorage.getItem("username");
//     const storedUserId = sessionStorage.getItem("user_id");
//     const storedExquisiteToggle = sessionStorage.getItem("exquisiteToggle");

//     if (storedIsLoggedIn === "true" && storedUsername && storedUserId) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//       setUserId(storedUserId);
//     }
//     setExquisiteToggle(storedExquisiteToggle === "true");
//   }, []);

//   useEffect(() => {
//     // Sync state to sessionStorage
//     sessionStorage.setItem("isLoggedIn", isLoggedIn.toString());
//     sessionStorage.setItem("username", username || "");
//     sessionStorage.setItem("user_id", user_id || "");
//     sessionStorage.setItem("exquisiteToggle", exquisiteToggle.toString());
//   }, [isLoggedIn, username, user_id, exquisiteToggle]);

//   const login = (username: string, user_id: string) => {
//     setIsLoggedIn(true);
//     setUsername(username);
//     setUserId(user_id);
//     sessionStorage.setItem("isLoggedIn", "true");
//     sessionStorage.setItem("username", username);
//     sessionStorage.setItem("user_id", user_id);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUsername(null);
//     setUserId(null);
//     sessionStorage.setItem("isLoggedIn", "false");
//     sessionStorage.setItem("username", "");
//     sessionStorage.setItem("user_id", "");
//   };

//   const toggleExquisiteMode = () => {
//     setExquisiteToggle((prev) => !prev);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isLoggedIn, username, user_id, exquisiteToggle, login, logout, toggleExquisiteMode }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }

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
  const { data: session } = useSession();  //session hook

  const [exquisiteToggle, setExquisiteToggle] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", session.user.username || "");
      sessionStorage.setItem("user_id", session.user.id || "");
    }
  }, [session]);

  const login = (username: string, user_id: string) => {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("user_id", user_id);
  };

  const logout = () => {
    signOut();  
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("user_id", "");
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
