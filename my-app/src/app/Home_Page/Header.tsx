"use client";

import React from "react";
import "./Header.css";
import Button from "../Shared_Components/Button";
import { IM_Fell_English_SC } from "next/font/google";
import GenreButton from "./GenreButton";
import { useAuth } from "../AuthContext"; // Import useAuth to access global state

const titleFont = IM_Fell_English_SC({
  subsets: ["latin"],
  weight: ["400"],
  adjustFontFallback: false,
});

export default function Header() {
  const { isLoggedIn, logout } = useAuth(); // Get auth state and logout function

  return (
    <header>
      <div className="title-container">
        <GenreButton />
        <h1 className={`${titleFont.className} title`}>Prose</h1>
      </div>

      <div>
        {isLoggedIn ? (
          <>
            <Button text="Write Review" targetPage="/Write_Review_Page" onClick={() => console.log("Navigating to Write Review page...")} />
            <Button
              text="Logout"
              onClick={() => {
                console.log("Logout button clicked");
                logout(); // Update state to logged out
                window.location.reload(); // Reload page to reflect logged-out state
              }}
            />
          </> 
        ) : (
          <>
            <Button text="Login" targetPage="/Login_Page" onClick={() => console.log("Navigating to Login page...")} />
            <Button text="Register" targetPage="/Register_Page" onClick={() => console.log("Navigating to Register page...")} />
          </>
        )}
      </div>
    </header>
  );
}
