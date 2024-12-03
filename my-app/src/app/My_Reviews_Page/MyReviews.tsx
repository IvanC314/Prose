"use client";

import React, { useState, useRef, useEffect } from "react";
import HomeHeader from "../Shared_Components/HomeHeader";
import Button from "../Shared_Components/Button";
import "./MyReviews.css";
import Reviews from "./Reviews";
import { useAuth } from "../AuthContext";

export default function MyReviews() {
  const { isLoggedIn, username, logout } = useAuth(); 
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false); 
  const userDropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out!");
    window.location.href = "/";
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
    <div>
      <div className="my-reviews-header">
        <div className="home-header">
          <HomeHeader />
        </div>
        <div className="header-buttons">
          <Button text="Write Review" targetPage="../Write_Review_Page" />
          {isLoggedIn ? (
            <div className="user-section" ref={userDropdownRef}>
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
            </div>
          ) : (
            <>
              <Button text="Login" targetPage="../Login_Page" />
              <Button text="Register" targetPage="../Register_Page" />
            </>
          )}
        </div>
      </div>
      <div className="reviews-title-wrapper">
        <h1 className="reviews-title">My Reviews</h1>
      </div>
      <Reviews />
    </div>
  );
}
