"use client";
import React, { useState, useEffect } from "react";
import "./Account.css";
import { monsieurClass } from "../styles/fontSwitcher";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    const { logout, user_id, isLoggedIn } = useAuth(); // Get auth state and logout function
    const router = useRouter();

    useEffect(() => {
        const delayRedirect = setTimeout(() => {
            if (!isLoggedIn || !user_id) {
                alert("You must be logged in to see account. Redirecting to login page");
                router.push("/Login_Page");
            }
        }, 1000);

        return () => clearTimeout(delayRedirect);
    }, [isLoggedIn, user_id, router]);
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
                alert("Password changed successfully")
            } else {
                alert("Password not correct")
            }
        } catch (error) {
            alert(error);
        }

        setCurrentPassword("");
        setNewPassword("");
    };

    const handleLogout = () => {
        console.log("Logged out!");
        logout();
        router.push("/");
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
                    <button className={`change-button account-logout-button`} onClick={handleLogout}>
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
