"use client";

import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import Button from "../Shared_Components/Button";
import { IM_Fell_English_SC } from "next/font/google";
import GenreButton from "./GenreButton";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const titleFont = IM_Fell_English_SC({
  subsets: ['latin'],
  weight: ['400'],
  adjustFontFallback: false,
});

export default function Header() {
  const { isLoggedIn, logout, username, user_id } = useAuth(); 
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false); 
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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

  useEffect(() => {
    console.log("Home Page Loaded!");
    console.log("isLoggedIn:", isLoggedIn);
    console.log("Username:", username);
    console.log("User ID:", user_id);
  }, [isLoggedIn, username, user_id]); 

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out!");
    logout();
    router.push("/"); 
  };

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
        <div onClick={toggleDropdown}>
          <GenreButton />
        </div>
        <Link href="/" className={`${titleFont.className} title`}>
          Prose
        </Link>
      </div>
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
