"use client";
import React, { useState } from "react";
import "./Account.css";
import Link from "next/link";
import { monsieurClass } from "../styles/fontSwitcher";
import { useAuth } from "../AuthContext";

interface AccountProps {
    profileImage: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    userId: string | null; 
}

export default function Account({
    profileImage,
    username,
    firstName,
    lastName,
    email,
    userId,
}: AccountProps) {
    const [currentImage, setCurrentImage] = useState(profileImage);
    const [showPopup, setShowPopup] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCurrentImage(imageUrl);
        }
    };

    const handlePasswordChange = async () => {
        try {
            console.log("USER ID" + userId);
            const response = await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Password updated successfully.");
            } else {
                setMessage(data.error || "Error updating password.");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="account-page">
            <div className="account-container">
                <img src={currentImage} alt="Profile" className={`profile-image`} />
                <h1 className={`account-title `}>Account Details</h1>
                <div className={`account-info`}>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>First Name:</strong> {firstName}</p>
                    <p><strong>Last Name:</strong> {lastName}</p>
                    <p><strong>Email:</strong> {email}</p>
                </div>
                <div className="account-buttons">
                    <label htmlFor="profile-image-upload" className={`change-picture-button`}>
                        Change Profile Picture
                    </label>
                    <input
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                    <button
                        className={`change-button`}
                        onClick={() => setShowPopup(true)}
                    >
                        Change Password
                    </button>
                    <button className={`change-button`}>
                        <Link href="../My_Reviews_Page">My Reviews</Link>
                    </button>
                    <button className={`change-button account-logout-button`}>
                        Logout
                    </button>
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Change Password</h2>
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordChange}>Submit</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
