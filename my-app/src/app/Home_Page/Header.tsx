"use client";

import React, { useState } from "react";
import "./Header.css";
import Button from "../Shared_Components/Button";
import { IM_Fell_English_SC } from "next/font/google";
import GenreButton from "./GenreButton";
import Link from "next/link";
import { useAuth } from "../AuthContext"; // Import useAuth to access global state

const titleFont = IM_Fell_English_SC({
  subsets: ["latin"],
  weight: ["400"],
  adjustFontFallback: false,
});

export default function Header() {
  const { isLoggedIn, logout } = useAuth(); // Get auth state and logout function
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

  const genres = [
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Non-Fiction",
    "Romance",
    "Young Adult",
    "Education",
    "Other",
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <div className="title-container">
        <div onClick={toggleDropdown}>
          <GenreButton />
        </div>
        <h1 className={`${titleFont.className} title`}>Prose</h1>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          {genres.map((genre, index) => (
            <Link href={`/genre/${genre}`} key={index}>
              <div className="dropdown-item">{genre}</div>
            </Link>
          ))}
        </div>
      )}

      <div>
        {isLoggedIn ? (
          <>
            <Button
              text="Write Review"
              targetPage="/Write_Review_Page"
              onClick={() => console.log("Navigating to Write Review page...")}
            />
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
            <Button
              text="Login"
              targetPage="/Login_Page"
              onClick={() => console.log("Navigating to Login page...")}
            />
            <Button
              text="Register"
              targetPage="/Register_Page"
              onClick={() => console.log("Navigating to Register page...")}
            />
          </>
        )}
      </div>
    </header>
  );
}
