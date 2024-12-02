"use client";

import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import Button from "../Shared_Components/Button";
import { IM_Fell_English_SC } from "next/font/google";
import GenreButton from "./GenreButton";
import { useAuth } from "../AuthContext";
import Link from "next/link";

const titleFont = IM_Fell_English_SC({
  subsets: ['latin'],
  weight: ['400'],
  adjustFontFallback: false,
});

export default function Header() {
  const { isLoggedIn, logout, username, user_id } = useAuth(); // Get auth state and logout function
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for genre dropdown menu
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false); // State for username dropdown menu
  const userDropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the username dropdown

  const genres = [
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Non-Fiction",
    "Romance",
    "Young Adult",
    "Philosophy",
    "Other",
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Log auth status when the component mounts
  useEffect(() => {
    console.log("Home Page Loaded!");
    console.log("isLoggedIn:", isLoggedIn);
    console.log("Username:", username);
    console.log("User ID:", user_id);
  }, [isLoggedIn, username, user_id]); // Re-run log if any of these values change
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out!");
    logout();
    // Simulate logging out
    window.location.href = "/"; // Redirect to the home page
  };

  // Close the user dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="title-container">
        {/* Use existing burger icon for the dropdown */}
        <div onClick={toggleDropdown}>
          <GenreButton />
        </div>
        <h1 className={`${titleFont.className} title`}>Prose</h1>
      </div>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
      <div className="dropdown-menu">
        {genres.map((genre, index) => (
          <Link href={`/genre/${genre.toLowerCase()}`} key={index}>
            <div className="dropdown-item">{genre}</div>
          </Link>
        ))}
      </div>
       )}
      <div className="user-section" ref={userDropdownRef}>
        {isLoggedIn ? (
          <>
            <Button
              text="Write Review"
              targetPage="/Write_Review_Page"
              onClick={() => console.log("Navigating to Write Review page...")}
            />
            <button className="username-button" onClick={toggleUserDropdown}>
              {username} ▼
            </button>
            {isUserDropdownOpen && (
              <div className="user-dropdown-menu">
                <div
                  className="dropdown-item"
                  onClick={() => (window.location.href = "/My_Reviews_Page")}
                >
                  My Reviews
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => (window.location.href = "/Account_Page")}
                >
                  Account Info
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
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
